const jwt = require('jsonwebtoken');
const {User,Whislist} = require('../models');
const user = require('../models/user');

const auth = (req,res,next)=>{
    if (!req.headers.access_token) {
        return next({name:'missing token'})
    }
    try {
            const decoded = jwt.verify(req.headers.access_token, process.env.JWT_KEY);
            req.userId = decoded
            User.findByPk(req.userId)
            .then(data=>{
                if (!data) {
                    throw{name:"login failed"}
                    next()
                }
            })
            .catch(err=>{
                next(err)
            })
        }
    catch (error) {
        next(error)
    }
}

const authoriz = (req,res,next)=>{
    const {userId} = req
    const {id} = req.params
    Whislist.findOne({id:id,userId:userId})
    .then(data=>{
        if (!data) {
            throw {name:"not found"}
        }else{
            req.whist = data
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {auth,authoriz}