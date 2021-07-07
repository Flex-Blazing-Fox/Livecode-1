const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  if (!req.headers.access_token) {
    next("no token found");
  } else {
    const decodedToken = jwt.verify(
      req.headers.access_token,
      process.env.JWT_SECRET
    );
    req.userId = decodedToken.id;
    next();
  }
};

module.exports = authentication;
