const router = require('express').Router()
const WishlistsController = require('../controllers/WishlistsController')
const {authorization} = require('../middlewares/auth')

router.post('/', WishlistsController.addWishlists)
router.get('/', WishlistsController.listWishlists)
router.delete('/',authorization, WishlistsController.deleteWishlists)

module.exports = router