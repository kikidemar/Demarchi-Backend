import express from 'express';
import index_router from './router/index_router.js'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { engine } from 'express-handlebars'
import { __dirname } from './utils.js'

const server = express()

// template engine
server.engine('handlebars', engine())
server.set('views', __dirname + '/views')
server.set('view engine', 'handlebars')

//middlewares
server.use('/public', express.static('public'))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/', index_router)
server.use(errorHandler)
server.use(notFoundHandler)

export default server
