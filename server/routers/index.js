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
        res.status(200).json({ access_token: access_token });
      }
    })
    .catch((err) => console.log(err));
});
routers.get("/wishlists", [authentication, authorization], (req, res) => {});
routers.post("/wishlists", authentication, (req, res) => {
  const { name, image_url, price, description } = req.body;
  Wishlist.create({
    user_id: req.userId,
    name: name,
    image_url: image_url,
    price: price,
    description: description,
  })
    .then((result) => {
      // res.status(201).json({
      //     name: result.dataValues.name,
      //     price: result.dataValues.price,
      //     image_url: result.dataValues.image_url,
      //     userId: result.dataValues.
      // })
      console.log(result);
    })
    .catch((err) => console.log(err));
});
routers.delete(
  "/wishlists/:id",
  [authentication, authorization],
  (req, res) => {}
);

module.exports = routers;
