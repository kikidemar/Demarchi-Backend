import {Router} from "express";
import Product from '../../models/Product.js'
import prod_manager from '../../dao/managers/productos.js'
import auth from '../../middlewares/auth.js'

const product_router = Router()

product_router.get('/', async (req, res, next) =>{
  try { 
    let products = await Product.find()
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

// product_router.get('/', async (req, res, next) => {
//   try {
//       const productsPerPage = 6

//       const defaultPage = 1
//       const page = req.query.page ? parseInt(req.query.page) : defaultPage
//       const filter = req.query.filter ? req.query.filter : ''

//       const query = {}
//       if (filter) {
//           query.title = { $regex: new RegExp(filter, 'i') }
//       }

      
//       const products = await Product.paginate(query, {
//           page: page,
//           limit: productsPerPage
//       })

//       console.log(products)

//       return res.status(200).json(products)
//   } catch (error) {
//       next(error)
//   }
// })



product_router.post('/', async (req, res, next) =>{
    try {

      let title = req.body.title
      let description = req.body.description
      let price = Number(req.body.price)
      let thumbnail = req.body.thumbnail
      let stock = Number(req.body.stock)
      let code = req.body.code

      let response = await Product.create({title, description, price, thumbnail, stock, code})
      if (response) {
        return res.json({ status:201, message: `product ${title} created`})
      }
      return res.json({ status: 400, message: 'not created'})
    } catch(error){
      next(error)
    }
  })

product_router.get('/:pid', async (req, res, next) =>{
  try {
    let id = String(req.params.pid)
    let product = await Product.findById(id)

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
      let id = String(req.params.pid)
      let data = req.body
      let response = await Product.findByIdAndUpdate(id,data,{new:true})
      if (response) {
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
      let id = String(req.params.pid)
      let response = await Product.findByIdAndDelete(id)
      if (response) {
        return res.json({status: 200, message:'product deleted'})
      } 
      return res.json({status:404, message:'not found'})
    } catch(error){
      next(error)
    }
  })

export default product_router