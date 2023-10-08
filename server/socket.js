const {Server} = require('socket.io')
const {allowedDomain} = require('./config').siteDetails
let io;
module.exports = {
    init:httpServer=>{
        io = require('socket.io')(httpServer,{
            cors:{
                origin:allowedDomain,
                credential:true
            }
        })
        return io
    },
    getIo:()=>{
        if(!io){
            throw new Error("IO not initialized")
        }
        return io
    }
}