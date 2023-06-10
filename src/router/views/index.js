import { Router } from "express";

const view_router = Router()

view_router.get('/',
async (req,res, next)=> {
  try {
    return res.render(
      'index',
      null,
      {
        script: './public/connection.js'
      }
    )
  } catch (error) {
    next(error)
  }
}
)

export default view_router