import { Router } from "express"
import SessionsController from "../../controllers/sessions.controller.js"

const sessions_router = Router()

sessions_router.get('/', SessionsController.getSession)
sessions_router.post('/login', SessionsController.login)
sessions_router.post('/logout', SessionsController.logout)


export default sessions_router