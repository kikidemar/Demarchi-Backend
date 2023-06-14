import express from 'express';
import 'dotenv/config.js'
import { connect } from 'mongoose'
import index_router from './router/index_router.js'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { __dirname } from './utils.js'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

const server = express()

//middlewares
server.use(cookieParser(process.env.SECRET_COOKIE))  // esta en el archivo .env
server.use(expressSession({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}))
server.use('', express.static('public'))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/', index_router)
server.use(errorHandler)
server.use(notFoundHandler)

//database



export default server
