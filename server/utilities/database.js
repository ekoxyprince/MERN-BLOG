const mongoose = require("mongoose")
const {db_name,url} = require('../config').database


const connectToDb = ()=>{
 return mongoose.connect(url,{
    dbName:db_name,
    autoIndex:false,
    useUnifiedTopology:true,
    useNewUrlParser:true
 })
}

module.exports = connectToDb
