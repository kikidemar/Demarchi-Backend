import nodemailer from 'nodemailer'
import config from '../config/config.js'
import {__dirname} from './dirname.js'

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user:config.gmail_user_app ,
    pass:config.gmail_pass_app
  }
})

const sendMail = async () => {
  return await transport.sendMail({
    from: 'Coder Test <demarchi.christiann@gmail.com>',
    to:'demarchi.christiann@gmail.com',
    subject:'Correo electronico de prueba',
    html: `<h1>Esto es un correo de prueba</h1>`,
    attachments: [{
      // filename: 'nodejs.png',
      // path: __dirname+'img/nodejs.png',
      // cid: 'nodejs'
  }]
  })
}

export default sendMail
