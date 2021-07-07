const router = require('express').Router();
const userRouter = require('./user')
const {auth,authoriz} = require('../middlewares')
const whistControllers = require('./whist')

router.use('/',userRouter)
router.use(auth)
router.use('/',whistControllers)

module.exports = router