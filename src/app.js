import express from 'express';
import 'dotenv/config.js'
import { connect } from 'mongoose'
import index_router from './router/index_router.js'
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import { __dirname } from './utils.js'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import morgan from 'morgan'
import mongoStore from 'connect-mongo'
import passport from 'passport'
import inicializePassport from './config/passport.js'

const server = express()

//middlewares

server.use(cookieParser(process.env.SECRET_COOKIE)) 
server.use(expressSession({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true,
  store: mongoStore.create({
    mongoUrl: process.env.LINK_MONGO,
    ttl: 10000
  })
}))

server.use('', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan('dev'))

inicializePassport()
server.use(passport.initialize())
server.use(passport.session())

server.use('/', index_router)
server.use(errorHandler)
server.use(notFoundHandler)




//database



export default server
