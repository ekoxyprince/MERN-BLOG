const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateJoined:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExpires:Date

})

module.exports = mongoose.model('User',userSchema)
