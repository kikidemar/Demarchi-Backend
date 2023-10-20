import sendmail from "../utils/sendMail.js";
import sendWhatsApp from "../utils/sendWhatsApp.js";

class MailingController {

  sendMail = async (req,res) => {
    await sendmail(
      'demarchi.christiann@gmail.com',
      'Mail de prueba',
      `<h1>Esto es un correo de prueba</h1>`
    )
    res.send('mail enviado')
  }

  sendWhatsApp = async (req,res) => {
    await sendWhatsApp('chris', 'demar')
    res.send('sms enviado')
  
  }

}

export default new MailingController()