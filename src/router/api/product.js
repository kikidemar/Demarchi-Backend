import {Router} from "express";
import manager from '../../managers/productos.js'

const product_router = Router()

product_router.get('/', async (req, res, next) =>{
  try { 
    let products = manager.getProducts()
    if(Number(req.query.limit)){
      let limit = req.query.limit
      let productsLimit = products.slice(0, limit)
      return res.send({
        status: 200,
        'products': productsLimit
      })
    } else {
      return res.send({
        status: 200,
        'products': products
      })
    } 
  } catch (error){
    next(error)
  }
  })


product_router.post('/', async (req, res, next) =>{
  try {
    let response = await manager.addProduct(req.body)
    if (response===201) {
      return res.json({ status:201, message: 'product created'})
    } 
    return res.json({ status: 400, message: 'not created'})
  } catch(error){
    next(error)
  }
})

product_router.get('/:id', async (req, res, next) =>{
  try {
    let parametros = req.params
    let id = Number(parametros.id)
    let one = manager.getProductById(id)

    if (one) {
    return res.send({
      status: 200,
      'product': one
    })
    } else {
      return res.send({
        status: 404,
        'product': 'not found'
      })
    }}
     catch(error){
      next(error)
    }
  })


  product_router.put('/:id', async (req, res, next) =>{
    try{
      let id = Number(req.params.id)
      let data = req.body
      let response = await manager.updateProduct(id,data)
      if (response===200) {
        return res.json({status: 200, message:'product updated'})
      } else{
        return res.json({ status:404, message:'not found'})
      }
    } catch(error){
      next(error)
    }
  })


  product_router.delete('/:id', async(req, res, next)=> {
    try{
      let id = Number(req.params.id)
      let response = await manager.deleteProduct(id)
      if (response===200) {
        return res.json({status: 200, message:'product deleted'})
      } 
      return res.json({status:404, message:'not found'})
    } catch(error){
      next(error)
    }
  })

export default product_router