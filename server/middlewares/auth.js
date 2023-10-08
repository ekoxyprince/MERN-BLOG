const User = require('../models/user')
const {promisify} = require ('util')
const jwt = require('jsonwebtoken')
const {jwt_secret, jwt_expires} = require('../config')
const catchAsync = require('../utilities/catchasync')


module.exports = catchAsync(async(req,res,next)=>{
    if(!req.cookies?.token){
        return res.status(401).json({success:false,body:{status:'error',info:'Unauthorized request'}})
        }
        const token = req.cookies.token
        const decoded = await promisify(jwt.verify)(token,jwt_secret)
        if(!decoded?.id){
            return res.status(401).json({success:false,body:{status:'error',info:'Unauthorized request'}})
        }
        let user = await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({success:false,body:{status:'error',info:'Unauthorized request'}})  
        }
        req.user = user
        next()

})