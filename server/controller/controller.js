const {User, Wishlist} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

class UserController{
    static register(req, res, next){
        const {email, password} = req.body
        User.create({email, password, saldo:5000000})
        .then(result=>{
            res.status(201).json({result})
        })
        .catch(err=>{
            res.status(400).json({err})
        })
    }

    static login (req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(result=>{
            if(result===0) throw({err: 'User Not Found'})
            const hash = result.password
            bcrypt.compare(password, hash, function(err, res) {
                if(res){
                    const access_token = jwt.sign({ id: result.id }, process.env.JWT_SECRET);
                    res.status(200).json({access_token})
                }else{
                    throw({err: 'INVALID PASSWORD'})
                }
            });
        })
        .catch(err=>{
            res.status(400).json({err})
        })
    }
}

class WishlistController{
    static getWishlists(req, res, next){
        const {access_token} = req.headers
        Wishlist.findAll({
            where: {UserId: id}
        })
        .then(result=>{
            res.status(200).json({result})
        })
        .catch(err=>{
            res.status(400).json({err})
        })
    }

    static addWishlists(req, res, next){

    }

    static deleteWishlists(req, res, next){

    }
}

module.exports = {UserController, WishlistController}