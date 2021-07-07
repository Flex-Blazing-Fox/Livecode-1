const {Whislist} = require('../models')

class whistControllers{
    static getwhistlist(req,res,next){
        Whislist.findAll()
        .then(data=>{
            res.status(200).json([data])
        })
        .catch(err=>{
            next(err)
        })
    }

    static add(req,res,next){
        const {userId} = req
        const {name,image_url,price,description} = req.body
        Whislist.create({name,image_url,price,description,userId},
            {
                include: [{
                  association: Whislist.User,
                  include: [ User.saldo ]
                }]
              })
        .then(data =>{
            res.status(201).json({
                name:data.name,
                price:data.price,
                image_url : data.image_url,
                UserId:data.userId,
                description:data.description,
                saldo: data.User.saldo
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req,res,next){
        const{id} = req.params
        Whislist.destroy({where:{
            id:+id
        }},
        {
            include: [{
              association: Whislist.User,
              include: [ User.saldo ]
            }]
        })
        
    }

}

module.exports = whistControllers