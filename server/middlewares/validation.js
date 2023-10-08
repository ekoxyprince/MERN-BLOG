const {check,body} = require('express-validator')
const User = require('../models/user')

exports.email =
check('email')
.notEmpty()
.withMessage('Email field is required')
.isEmail()
.withMessage("Please Enter a valid email address")
.normalizeEmail()

exports.user = 
body('email')
.notEmpty()
.withMessage('Email field is required')
.custom((value,{req})=>{
   return User.findOne({email:value})
    .then(user=>{
        if(user){
          return Promise.reject("User already exists with this email")
        }
    })
})

exports.password = 
body("password")
.notEmpty()
.withMessage('Password field is required')
.isLength({min:8})
.withMessage("Password must be greater than 8")
.trim()

exports.title = 
body("title")
.notEmpty()
.withMessage("Post title field is required")
.trim()

exports.content = 
body("content")
.notEmpty()
.withMessage('Post content field is required')
.trim()


