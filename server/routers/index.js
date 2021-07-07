const router = require('express').Router()
const usersRouter = require('./users')
const wishlistsRouter = require('./wishlists')
const {authentication} = require('../middlewares/auth')

router.use('/', usersRouter)
router.use(authentication)
router.use('/wishlists', wishlistsRouter)

module.exports = router