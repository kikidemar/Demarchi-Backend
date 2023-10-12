import  productService  from '../service/index.js'


class ProductController{

  constructor(){
    this.productService = productService
  }

  getProducts = async (req, res, next) =>{
    try { 
      let products = await productService.getProducts()
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
    }

  getProduct = async (req, res, next) =>{
    try {
      let id = String(req.params.pid)
      let product = await productService.getProduct(id)
  
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
    }

  createProduct = async (req, res, next) =>{
    try {

      let title = req.body.title
      let description = req.body.description
      let price = Number(req.body.price)
      let thumbnail = req.body.thumbnail
      let stock = Number(req.body.stock)

      let response = await productService.createProduct({title, description, price, thumbnail, stock})
      if (response) {
        return res.json({ status:201, message: `product ${title} created`})
      }
      return res.json({ status: 400, message: 'not created'})
    } catch(error){
      next(error)
    }
  }

  updateProduct = async (req, res, next) =>{
    try{
      let id = String(req.params.pid)
      let data = req.body
      let response = await productService.updateProduct(id,data,{new:true})
      if (response) {
        return res.json({status: 200, message:'product updated'})
      } else{
        return res.json({ status:404, message:'not found'})
      }
    } catch(error){
      next(error)
    }
  }
  
  deleteProduct = async(req, res, next)=> {
    try{
      let id = String(req.params.pid)
      let response = await productService.deleteProduct(id)
      if (response) {
        return res.json({status: 200, message:'product deleted'})
      } 
      return res.json({status:404, message:'not found'})
    } catch(error){
      next(error)
    }
  }

}

export default new ProductController()