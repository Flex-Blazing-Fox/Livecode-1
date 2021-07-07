const { Wishlists } = require('../models')

class WishlistsController{
    static addWishlists (req, res, next) {
        const {name, image_url, price, description} = req.body
        const { userID } = req

        Wishlists.create({name, image_url, price, description})
        .then(wishlists => {
            res.status(201).json({data: {
                id: wishlists.id,
                name: wishlists.name,
                image_url: wishlists.image_url,
                price: wishlists.price,
                description: wishlists.description,
                UserId : userId
            }})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static listWishlists (req, res, next) {
        const { userId } = req

        Wishlists. findAll({where: {userId}})
        .then(wishlists => {
            res.status(200).json({data : {wishlists}})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static deleteWishlists (req, res, next) {
        const { id } = req.params
        
        Wishlists.destroy(id)
        .then(()=> {
            res.status(200).json({message: "Delete Success"})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = WishlistsController