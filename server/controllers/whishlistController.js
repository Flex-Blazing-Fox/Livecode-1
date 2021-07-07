const {Whishlist} = require('../models')

class WhishlistController {
    static getAll(req, res, next){
        Whishlist.findAll({where:{UserId:req.UserId}})
        .then(result => {

        })
        .catch(err => {
            
        })
    }
}