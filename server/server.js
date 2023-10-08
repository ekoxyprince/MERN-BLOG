const app = require('./app')
const http = require('http')
const {port} = require('./config').siteDetails
const server = http.createServer(app)
const io = require('./socket').init(server)
const connectToDb = require('./utilities/database')

connectToDb()
.then(connected=>{
    console.log('connected to database')
    server.listen(port,()=>{
        console.log(`Listening on Port ${port}`)
        io.on('connection',socket=>{
          console.log('connected to socket')
        })
    })
})
.catch(error=>{
    console.log(error)
})