const router = require('express').Router()
const {UserController, WishlistController} = require('../controller/controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/wishlists', WishlistController.getWishlists)
router.post('/wishlists', WishlistController.addWishlists)

module.exports = router