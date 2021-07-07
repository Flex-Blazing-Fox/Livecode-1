const { Wishlist } = require("../models");

const authorization = (req, res, next) => {
  Wishlist.findAll({
    where: {
      user_id: req.userId,
    },
  })
    .then((result) => {
      req.authorizedWishlists = result;
      next();
    })
    .catch((err) => next(err));
};

module.exports = authorization;
