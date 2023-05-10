import { Router } from "express";
import products_router from "./product.js"
import cart_router from "./cart.js"

const api_router = Router()

api_router.use('/products', products_router)
api_router.use('/carts', cart_router)

export default api_router