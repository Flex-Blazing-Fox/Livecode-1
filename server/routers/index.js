const routers = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Wishlist } = require("../models");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

routers.post("/register", (req, res) => {
  const { email, password } = req.body;
  User.create({ email, password })
    .then((result) => {
      res.status(201).json({
        id: result.dataValues.id,
        email: result.dataValues.email,
        saldo: result.dataValues.saldo,
      });
    })
    .catch((err) => console.log(err));
});
routers.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((result) => {
      if (result && bcrypt.compareSync(password, result.dataValues.password)) {
        const payload = {
          id: result.dataValues.id,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({
          id: result.dataValues.id,
          email: result.dataValues.email,
          access_token: access_token,
          saldo: result.dataValues.saldo,
        });
      }
    })
    .catch((err) => console.log(err));
});
routers.get("/wishlists", [authentication, authorization], (req, res) => {
  if (req.authorizedWishlists) {
    res.status(200).json(req.authorizedWishlists);
  } else {
    req.status(200).json({ message: "No wishlist created" });
  }
});
routers.post("/wishlists", authentication, (req, res) => {
  const { name, image_url, price, description } = req.body;
  User.findOne({
    where: {
      id: req.userId,
    },
  })
    .then((result) => {
      if (result.dataValues.saldo > price) {
        User.update(
          {
            saldo: result.dataValues.saldo - price,
          },
          {
            where: {
              id: result.dataValues.id,
            },
          }
        )
          .then(() => {
            Wishlist.create({
              user_id: req.userId,
              name: name,
              image_url: image_url,
              price: price,
              description: description,
            }).then((result) => {
              res.status(201).json({
                name: result.dataValues.name,
                price: result.dataValues.price,
                image_url: result.dataValues.image_url,
                userId: result.dataValues.user_id,
                description: result.dataValues.description,
              });
            });
          })
          .catch((err) => console.log(err));
      } else {
        throw new Error("insufficient saldo");
      }
    })
    .catch((err) => console.log(err));
});
routers.delete(
  "/wishlists/:id",
  [authentication, authorization],
  (req, res) => {
    const { id } = req.params;
    let sisaSaldo;
    if (req.authorizedWishlists) {
      let wishlist = req.authorizedWishlists.find(
        (wishlist) => wishlist.dataValues.id === +id
      );
      if (!wishlist) {
        res
          .status(200)
          .json({ message: "No wishlist founded or wishlist not authorized" });
      } else {
        User.findOne({
          where: {
            id: req.userId,
          },
        })
          .then((result) => {
            sisaSaldo = result.dataValues.saldo + wishlist.dataValues.price;
            return User.update(
              {
                saldo: sisaSaldo,
              },
              {
                where: {
                  id: req.userId,
                },
              }
            );
          })
          .then(() => {
            return Wishlist.destroy({
              where: {
                id: id,
              },
            });
          })
          .then(() => {
            res.status(200).json({
              message: "Successfully deleted wishlist",
              saldo: sisaSaldo,
            });
          })
          .catch((err) => console.log(err));
      }
    } else {
      res
        .status(401)
        .json({ message: "No wishlist founded or wishlist not authorized" });
    }
  }
);

module.exports = routers;
