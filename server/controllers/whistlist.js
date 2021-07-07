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
        
    }

}

module.exports = whistControllers