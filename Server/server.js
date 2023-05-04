import express from 'express';
import manager from '../productos.js'

let server = express()

let PORT = 8080

let ready = () => console.log('server ready on PORT: ' + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))


let indexRoute = '/products'
let indexFunction = (req, res) => {
  let products = manager.getProducts()
  
  if(Number(req.query.limit)){
    let limit = req.query.limit
    let productsLimit = products.slice(0, limit)
    return res.send({
      'success': true,
      'products': productsLimit
    })
  } else {
    return res.send({
      'success': true,
      'products': products
    })
  } 

}

server.get(indexRoute, indexFunction)

let oneRoute = '/products/:id'
let oneFunction = (req, res) => {
  let parametros = req.params
  let id = Number(parametros.id)
  let one = manager.getProductById(id)

  if (one) {
  return res.send({
    'success': true,
    'product': one
  })
  } else {
    return res.send({
      'success': false,
      'product': {}
    })
  }
}

server.get(oneRoute, oneFunction)