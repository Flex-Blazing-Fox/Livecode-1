const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User, Wishlists } = require('../models')

router.post('/register', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    
    res.status(201).json({ id: user.id, email, saldo: 5000000 })
  } catch (err) {
    res.status(500).json(err)
  }

})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      res.status(400).json({ msg: 'email not found' })
    }

    const isCorrect = bcrypt.compareSync(password, user.password)

    if (!isCorrect) {
      res.status(400).json({ msg: 'password is wrong' })
    }

    const payload = {
      id: user.id,
      email: user.email,
      saldo: user.saldo
    }

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET)

    res.status(200).json({
      id: payload.id,
      email: payload.email,
      access_token: accessToken,
      saldo: payload.saldo
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/wishlists', async (req, res) => {})

router.post('/wishlists', async (req, res) => {})

router.delete('/wishlists/:id', async (req, res) => {})


module.exports = router