const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {jwt_expires,cookie_expires,jwt_secret}  = require('../config')

exports.signup = (req,res,next)=>{
    const errors = validationResult(req)
    const {firstname,lastname,email,password} = req.body
    const dateJoined = new Date(Date.now());
    if(!errors.isEmpty()){
      return  res.status(422).json({success:false,body:{status:'error',info:errors.array()}})
    }
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
    return User.create({
        firstname:firstname,lastname:lastname,email:email,password:hashedPassword,
        role:'Subscriber',verified:false,status:'active',dateJoined
    })
    })
    .then(saved=>{
        res.status(200).json({success:true, body:{status:'success',data:{user:saved},info:"Signup successful"}})
    })
    .catch(error=>{
             const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}

exports.signin = (req,res,next)=>{
     const errors = validationResult(req)
     const {email,password} = req.body
     if(!errors.isEmpty()){
        return res.status(422).json({success:false,body:{status:'error',info:errors.array()}})
     }
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.status(400).json({success:false,body:{status:"error",info:[{msg:"No user found",path:'email'}]}})
        }
        return bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(!doMatch){
                return res.status(400).json({success:false,body:{status:"error",info:[{msg:"Password incorrect",path:'password'}]}})   
            }
            const token = jwt.sign({id:user._id},jwt_secret,{expiresIn:jwt_expires})
            res.cookie('token',token,{
              expires:new Date(Date.now() + cookie_expires * 60 * 1000) ,
              httpOnly:true 
            })
            res.status(200).json({success:true,body:{status:'success',data:{user:user,token:token},info:'Signin successful'}})
        })
    })
    .catch(error=>{
             const err = new Error(error)
        err.httpStatusCode = 500
        next(err)
    })
}