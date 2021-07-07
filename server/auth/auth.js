const {User, Wishlist} = require('../models')
class Auth{
    static authentication(req, res, next){
        const {access_token} = req.headers
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
        const UserId = decoded.id
        if(!access_token) throw({err: 'Login Terlebih dahulu'})
        User.findOne({
            where: {id: UserId}
        })
        .then(_=>{
            next()
        })
        .catch(err=>{
        })
    }
    static authorization(req, res, next){

    }
}