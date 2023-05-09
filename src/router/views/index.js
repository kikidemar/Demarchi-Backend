import { Router } from "express";

const view_router = Router()

view_router.get('/',
(req,res)=> res.json({endpoint:'view'})
)

export default view_router