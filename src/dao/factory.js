import { config } from "dotenv"

let ProductDao
let CartDao
let UserDao

switch (config.persistence) {
    case 'MONGO':
      ProductDao = require('../dao/Mongo/product.mongo.js')
      CartDao = require('../dao/Mongo/cart.mongo.js')
      // UserDao = require('../dao/Mongo/user.mongo.js')

    break

    // case 'MEMORY':
    //   ProductDao = require('../dao/Memory/product.memory.js') 
    //   CartDao = require('../dao/Memory/cart.memory.js')
    //   UserDao = require('../dao/Memory/user.memory.js')
    // break

    // case 'FILE':
    //   ProductDao = require('../dao/File/product.file.js') 
    //   CartDao = require('../dao/File/cart.file.js')
    //   UserDao = require('../dao/File/user.file.js')
    // break
}