const { User, Wishlists } = require('../models')

const authorization = async (req, res, next) => {
  try {
    const UserId = req.user.id
    const wishlists = await Wishlists.findAll({ where: { UserId }})
    if (wishlists.length === 0) {
      return res.status(404).json({ msg: 'wishlist not found' })
    }

    req.wishlists = wishlists
    next()
  } catch (err) {
    res.status(403).json({ msg: 'FORBIDDEN' })
  }
}

module.exports = authorization