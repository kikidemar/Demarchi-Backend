import { Router } from "express";
import MailingController from "../../controllers/mailing.controller.js";


const mailing_router = Router()

mailing_router.get('/', MailingController.sendMail)

mailing_router.get('/wa', MailingController.sendWhatsApp)

export default mailing_router