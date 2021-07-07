const { User, Food } = require('../models');
const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  if(!req.headers.access_token) return next({ name: 'missing_access_token'});

  try{
    const decoded = jwt.verify(req.headers.access_token, process.env.JWT_PRIVATE_KEY);
    req.userId = decoded.id;
  }
  catch(err) {
    console.log(err);
  }

  User.findByPk(req.userId)
  .then(user => {
    if(!user) throw { name: 'login_failed' };
    next();
  })
  .catch(err => {
    next(err)
  })
}

const authorization = (req, res, next) => {
  const { id } = req.params;

  Food.findOne({ where: {id, userId: req.userId} })
  .then(food => {
    if(!food) throw { name: 'not_found' };
    req.food = food;
  })
  .catch(err => {
    next(err)
  })
}

module.exports = { authentication, authorization };