const router = require('express').Router()
const usersRouter = require('./users')
const wishlistsRouter = require('./wishlists')

router.use('/', usersRouter)

router.use('/wishlists', wishlistsRouter)

module.exports = router