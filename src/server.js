import express from 'express';
import index_router from './router/index_router.js';
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'

let server = express()

let PORT = 8080

let ready = () => console.log('server ready on PORT: ' + PORT)

server.listen(PORT, ready)
server.use('/public', express.static('public'))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/', index_router)
server.use(errorHandler)
server.use(notFoundHandler)


