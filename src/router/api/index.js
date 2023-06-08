import { Router } from "express";
//import product_router from "./product.js"
//import products_router from "./products.mongo.js"
//import cart_router from "./cart.js"
import cart_router from "./carts.mongo.js"
import product_router from "./products.mongo.js";

const api_router = Router()

api_router.use('/products', product_router)
api_router.use('/carts', cart_router)

export default api_router