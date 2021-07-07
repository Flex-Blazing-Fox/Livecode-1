const userControllers = require('../controllers/user');
const router = require('express').Router();

router.post('/register',userControllers.createUser)
router.post('/login',userControllers.login)

module.exports = router