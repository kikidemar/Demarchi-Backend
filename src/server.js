import express from 'express';
import manager from './managers/productos.js'
import index_router from './router/index_router.js';
import errorHandler from './middlewares/errorHandler.js'
import notFoundHandler from './middlewares/notFoundHandler.js'

let server = express()

let PORT = 8080

let ready = () => console.log('server ready on PORT: ' + PORT)

server.listen(PORT, ready)
server.use('/public', express.static('public'))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/', index_router)
server.use(errorHandler)
server.use(notFoundHandler)


// let indexRoute = '/products'
// let indexFunction = (req, res) => {
//   let products = manager.getProducts()
  
//   if(Number(req.query.limit)){
//     let limit = req.query.limit
//     let productsLimit = products.slice(0, limit)
//     return res.send({
//       'success': true,
//       'products': productsLimit
//     })
//   } else {
//     return res.send({
//       'success': true,
//       'products': products
//     })
//   } 

// }

// server.get(indexRoute, indexFunction)

// let oneRoute = '/products/:id'
// let oneFunction = (req, res) => {
//   let parametros = req.params
//   let id = Number(parametros.id)
//   let one = manager.getProductById(id)

//   if (one) {
//   return res.send({
//     'success': true,
//     'product': one
//   })
//   } else {
//     return res.send({
//       'success': false,
//       'product': {}
//     })
//   }
// }

// server.get(oneRoute, oneFunction)