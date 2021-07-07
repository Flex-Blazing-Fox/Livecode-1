const {User} = require('../models')
const jwt = require('jsonwebtoken');
class userControllers{
    static createUser(req,res,next){
        const {email,password} = req.body
        User.create({email,password})
        .then(data=>{
            res.status(201).json({email:data.email,password:data.password})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({email,password})
        .then(data=>{
            res.status(201).json({email:data.email,password:data.password})
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports = userControllers