import { Router } from "express"
import Cart from '../../models/Cart.js'
import Product from '../../models/Product.js'

const cart_router = Router()

cart_router.post('/', async(req,res,next)=> {
    try {
        let response = await Cart.create({products: []})
        if (response) {
          return res.status(201).json({ id: response._id.toJSON(), cart: response, message: 'cart created' })
      }
      return res.status(400).json({ message: 'not created' })
  } catch (error) {
      next(error)
  }
})

cart_router.get('/', async (req, res, next) => {
  try {
      const all = await Cart.find().exec()
      res.status(200).json(all)
  } catch (error) {
      next(error)
  }
})

cart_router.get('/:cid', async (req, res, next) => {
  try {
      let id = req.params.cid
      let one = await Cart.findById(id).exec()
      return res.status(200).json(one)
  } catch (error) {
      next(error)
  }
})

cart_router.put('/:cid', async (req, res, next) => {
  try {
      let id = req.params.cid
      let data = req.body

      let response = await Cart.findByIdAndUpdate(id, data)
      if (response) {
          return res.status(200).json({ message: 'cart updated' })
      }
      return res.status(404).json({ message: 'not found' })
  } catch (error) {
      next(error)
  }
})

// cart_router.put("/:cid/product/:pid/:units", async (req, res, next) => {
//     try {
//         let id = Number(req.params.pid);
//         let cid = Number(req.params.cid);
//         let units = Number(req.params.units);
    
//         let response = await cart_manager.update_cart(cid, id, units);
//         if (response === 200) {
//             return res.json({ status: 200, message: "cart updated" });
//         }
//         return res.json({ status: 404, message: "not found" });
//         } catch (error) {
//         next(error);
//         }
//     })

cart_router.delete('/:cid', async (req, res, next) => {
  try {
      let id = req.params.cid
      let response = await Cart.findByIdAndDelete(id)
        if (response) {
          return res.json({ status: 200, message: 'cart deleted' })
        }
        return res.json({ status: 404, message: 'not found' })
      } catch (error) {
          next(error)
      }
  })

// cart_router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
//     try {
//     let id = Number(req.params.pid);
//     let cid = Number(req.params.cid);
//     let units = Number(req.params.units);

//     let response = await cart_manager.delete_cart(cid, id, units);
//     if (response === 200) {
//         return res.json({ status: 200, message: "Units Delete" });
//     }
//     return res.json({ status: 404, message: "not found" });
//     } catch (error) {
//     next(error);
//     }
// })


export default cart_router