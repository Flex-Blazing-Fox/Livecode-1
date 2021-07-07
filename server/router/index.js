const router = require('express').Router()
const {UserController, WishlistController} = require('../controller/controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/wishlists', WishlistController.getWishlists)
router.post('/wishlists', WishlistController.addWishlists)
router.delete('/wishlists/:id', WishlistController.deleteWishlists)


module.exports = router