const router = require('express').Router()
const { Users } = require('../models')

router.post('/register', (req,res) => {
    console.log(req.body);
    const { email, password} = req.body

    Users.create({email,password})
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router