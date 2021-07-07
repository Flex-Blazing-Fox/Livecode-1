const jwt = require('jsonwebtoken');
const {User,Whislist} = require('../models');
const user = require('../models/user');

const auth = (req,res,next)=>{
    try {
        if (!req.headers.access_token) {
             throw {name:"invalid access token"}
             next()
        }else{
            const decoded = jwt.verify(req.headers.access_token, process.env.JWT_KEY);
            req.userId = decoded
            next()
        }
        
    } catch (error) {
        next(error)
    }
}

const authoriz = (req,res,next)=>{
    const {userId} = req
    const {id} = req.params
    Whislist.findOne({id:id,userId:userId})
    .then(data=>{
        req.whist = data
        next()
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {auth,authoriz}