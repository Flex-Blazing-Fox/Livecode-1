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
        User.findOne({where:{email:email}})
        .then(data=>{
            const compassword =  bcrypt.compareSync(password, data.password); 
            const key = process.env.JWT_KEY
            if (data && compassword) {
                const paylod = {id:data.id}
                var access_token = jwt.sign(paylod, key);
                res.status(200).json({id:data.id,email:data.email,access_token:access_token,saldo:data.saldo})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}
module.exports = userControllers