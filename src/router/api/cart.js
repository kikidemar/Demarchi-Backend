import { Router } from "express"
import manager from '../../managers/carrito.js'

const cart_router = Router()

cart_router.post('/', async(req,res,next)=> {
    try {
        let response = await manager.addCart(req.body)
        if (response===201) {
            return res.json({ status:201,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }
})
cart_router.get('/', async(req,res,next)=> {
    try {
        let all = manager.getCarts()
        if (all.length>0) {
            return res.json({ status:200,all })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
cart_router.get('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let one = manager.getCart(id)
        if (one) {
            return res.json({ status:200,one })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
cart_router.put('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let data = req.body
        let response = await manager.updateCart(id,data)
        if (response===200) {
            return res.json({ status:200,message:'cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})
cart_router.delete('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let response = await manager.deleteCart(id)
        if (response===200) {
            return res.json({ status:200,message:'cart deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

export default cart_router