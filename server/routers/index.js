const routers = require("express").Router();
const { User } = require("../models");

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
routers.post("/login", (req, res) => {});
routers.get("/wishlists", (req, res) => {});
routers.post("/wishlists", (req, res) => {});
routers.delete("/wishlists/:id", (req, res) => {});

module.exports = routers;
