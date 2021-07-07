const { Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res){
        console.log(req.body);
        const { email, password} = req.body

        Users.create({email,password})
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static login(req, res, next){
        const {email, password} = req.body

        Users.findOne({where:{email}})
        .then(result => {
            if(result && bcrypt.compareSync(password, result.password)){
                const payload = {
                    id : result.id
                }

                let access_token = jwt.sign(payload, process.env.SECRET_KEY)

                res.status(200).json({"access_token":access_token})
            }
        })
        .catch(err => {
            res.status(401).json(err)
        })
    }
}

module.exports = UserController