const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authenticate = async (req, res, next) => {
  const { access_token } = req.headers

  try {
    const decodedUser = jwt.verify(access_token, process.env.TOKEN_SECRET)
    const user = await User.findByPk(decodedUser.id)
    
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }

    req.user = user

    next()
  } catch (err) {
    res.status(400).json({ msg: 'invalid access_token'})
  }
}

module.exports = authenticate