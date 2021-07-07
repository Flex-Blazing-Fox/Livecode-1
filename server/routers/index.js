const UserController = require('../controllers/userController')

const router = require('express').Router()

router.get('/', (req, res) =>{
    res.json("Success request")
})
router.post('/register', UserController.register)

module.exports = router