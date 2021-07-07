const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const authorization = require('../middlewares/authorization')
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
      return res.status(400).json({ msg: 'email not found' })
    }

    const isCorrect = bcrypt.compareSync(password, user.password)

    if (!isCorrect) {
      return res.status(400).json({ msg: 'password is wrong' })
    }

    const payload = {
      id: user.id,
      email: user.email,
      saldo: user.saldo
    }

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET)

    return res.status(200).json({
      id: payload.id,
      email: payload.email,
      access_token: accessToken,
      saldo: payload.saldo
    })

  } catch (err) {
    res.status(500).json(err)
  }
})

router.use(authenticate)

router.post('/wishlists', async (req, res) => {
  const { name, image_url, price, description } = req.body
  const UserId = req.user.id

  try {
    const wishlist = await Wishlists.create({
      name,
      image_url,
      price,
      UserId,
      description
    })
    const user = await User.findByPk(UserId)

    if (wishlist.price > user.saldo) {
      return res.status(400).json({ msg: 'saldo tidak mencukupi' })
    }

    user.saldo = user.saldo - wishlist.price
    user.save()

    res.status(201).json({
      name,
      price,
      image_url,
      UserId,
      description,
      saldo: user.saldo
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/wishlists', authorization, async (req, res) => {
  const wishlists = req.wishlists
  
  res.status(200).json(wishlists)
})

router.delete('/wishlists/:id', authorization, async (req, res) => {
  const { id } = req.params
  const UserId = req.user.id
  try {
    const wishlist = await Wishlists.findByPk(id)
    const user = await User.findByPk(UserId)
    await Wishlists.destroy({ where: { id }, returning: true })
    user.saldo = user.saldo + wishlist.price
    user.save()
    
    return res.status(200).json({ 
      message: 'Successfully delete Wishlist',
      saldo: user.saldo
    })
    
  } catch (err) {
    res.status(500).json(err)
  }

})


module.exports = router