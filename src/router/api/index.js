import { Router } from "express";
//import product_router from "./product.js"
//import products_router from "./products.mongo.js"
//import cart_router from "./cart.js"
import cart_router from "./carts.mongo.js"
import product_router from "./products.mongo.js";
import cookies_router from "./cookies.js";
import sessions_router from "./sessions.js"
import auth_router from "./auth.js"

const api_router = Router()

api_router.use('/products', product_router)
api_router.use('/carts', cart_router)
api_router.use('/cookies', cookies_router)
api_router.use('/session', sessions_router)
api_router.use('/auth', auth_router)

export default api_router