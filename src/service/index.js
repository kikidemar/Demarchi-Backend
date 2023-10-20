import  ProductDaoMongo  from '../dao/Mongo/productDao.mongo.js'
import ProductRepository from "../repositories/product.repository.js"
import UserDaoMongo from '../dao/Mongo/authDao.mongo.js'
import UserRepository from '../repositories/user.repository.js'


const productService = new ProductRepository(new ProductDaoMongo())
const userService = new UserRepository(new UserDaoMongo())

export { productService, userService } 