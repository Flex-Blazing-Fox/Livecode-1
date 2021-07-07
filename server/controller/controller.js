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
            bcrypt.compare(password, hash, function(err, result2) {
                if(result2){
                    const access_token = jwt.sign({ id: result.id}, process.env.JWT_SECRET);
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
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        const UserId = decoded.id
        Wishlist.findAll({
            where: {UserId}
        })
        .then(result=>{
            res.status(200).json({result})
        })
        .catch(err=>{
            res.status(400).json({err})
        })
    }

    static addWishlists(req, res, next){
        const {access_token} = req.headers
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        const UserId = decoded.id
        const {name, image_url, price, description} = req.body
        let wishlistAdded
        let saldo
        User.findOne({
            where: {id: UserId}
        })
        .then(result=>{
            saldo = result.saldo
            if(saldo<price){
                throw({err: 'SALDO TIDAK CUKUP'})
            }
            return Wishlist.create({name, image_url, price, UserId, description})
        })
        
        .then(result=>{
            wishlistAdded = result
            
            const newSaldo = saldo - price
            return User.update({saldo: newSaldo}, {
                where:{
                    id: UserId
                },
                returning: true
            })    
        })
        .then(result=>{
            saldo = result.saldo
            res.status(200).json({wishlistAdded, saldo})
        })

        .catch(err=>{
            console.log(err);
            status(400).json({err})
        })
    }

    static deleteWishlists(req, res, next){
        const {id} = req.params
        const {access_token} = req.headers
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        const UserId = decoded.id
        let price
        let saldo
        User.findOne({
            where: {id: UserId}
        })
        .then(result=>{
            saldo = result.saldo
            return Wishlist.findOne({
                where: {id}
            })
        })
        .then(result=>{
            price = result.price
            return Wishlist.destroy({
                where:{id}
            })
        })
        .then(_=>{
            const newSaldo = saldo + price
            return User.update({saldo: newSaldo}, {
                where:{
                    id: UserId
                }
            })  
        })
        .then(result=>{
            const saldo = result.saldo
            res.status(200).json({"message": "Successfully delete Wishlist", saldo})
        })
        .catch(err=>{
            status(400).json({err})
        })
    }
}

module.exports = {UserController, WishlistController}