import {Router} from "express";
import prod_manager from '../../managers/productos.js'

const product_router = Router()

product_router.get('/', async (req, res, next) =>{
  try { 
    let products = prod_manager.getProducts()
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


product_router.post('/', async (req, res, next) => {
  try {
      let title = req.body.title
      let description = req.body.description
      let price = Number(req.body.price)
      let thumbnail = req.body.thumbnail
      let stock = Number(req.body.stock)

      
      let response = await prod_manager.addProduct( { title, description, price, thumbnail, stock} );
      if (response===201) {
          return res.redirect('/products') 
          
      }
    
      return res.status(400).json({ status: 400, message: 'Product not created' })
      } catch (error) {
      next(error)
      }
  })

product_router.get('/:pid', async (req, res, next) =>{
  try {
    let id = Number(req.params.pid)
    let product = prod_manager.getProductById(id)

    if (product) {
    return res.send({
      status: 200,
      'product': product
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


  product_router.put('/:pid', async (req, res, next) =>{
    try{
      let id = Number(req.params.pid)
      let data = req.body
      let response = await prod_manager.updateProduct(id,data)
      if (response===200) {
        return res.json({status: 200, message:'product updated'})
      } else{
        return res.json({ status:404, message:'not found'})
      }
    } catch(error){
      next(error)
    }
  })


  product_router.delete('/:pid', async(req, res, next)=> {
    try{
      let id = Number(req.params.pid)
      let response = await prod_manager.deleteProduct(id)
      if (response===200) {
        return res.json({status: 200, message:'product deleted'})
      } 
      return res.json({status:404, message:'not found'})
    } catch(error){
      next(error)
    }
  })

export default product_router