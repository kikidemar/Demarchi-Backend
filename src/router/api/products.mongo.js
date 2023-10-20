import {Router} from "express";
// import prod_manager from '../../dao/productos.js'
import auth from '../../middlewares/auth.js'
import passport from 'passport'
import passport_call from "../../middlewares/passport_call.js"
import ProductController from '../../controllers/product.controller.js'
import isPremium from "../../middlewares/isPremium.js";

const product_router = Router()

product_router.get('/', passport_call('jwt'), ProductController.getProducts)

product_router.post('/', passport_call('jwt'), isPremium, ProductController.createProduct)

product_router.get('/:pid', ProductController.getProduct)

product_router.put('/:pid', passport_call('jwt'), isPremium, ProductController.updateProduct)

product_router.delete('/:pid', passport_call('jwt'), isPremium, ProductController.deleteProduct)

export default product_router
