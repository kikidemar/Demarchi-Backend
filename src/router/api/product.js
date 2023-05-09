import {Router} from "express";

const product_router = Router()

product_router.get('/', (req, res, next) =>{
  try { 
    return res.json({status: "success" })
  } catch (error){
    next(error)
  }
  })
// product_router.post()
// product_router.put()
// product_router.delete()

export default product_router