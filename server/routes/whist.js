const router = require('express').Router()
const whistControllers = require('../controllers/whistlist')

router.post('/wishlists',whistControllers.add)
router.get('/wishlists',whistControllers.getwhistlist)
router.delete('/wishlists/:id',whistControllers.delete)

module.exports = router