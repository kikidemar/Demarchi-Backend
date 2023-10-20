import User from "../dao/Mongo/models/User.js"
import sendMail from '../utils/sendMail.js'
import config from '../config/config.js'
import Jwt from 'jsonwebtoken'
import { logger } from '../config/logger.js'
import { compareSync, genSaltSync, hashSync } from 'bcrypt'

class AuthController {

  register = async(req,res,next)=> {
  
    try {
      res.status(201).json({
      success: true,
      message: 'user created!'
      })
  } catch (error) {
      return next(error)
    } 
  }

  failRegister = (req, res) => { res.status(400).json({
    success:false,
    message: ' Error auth'
  })}

  login = (req, res, next) => {
    try {
      // const {email} = req.body
      // req.session.email = email
      // req.session.role = req.user.role
      const {cid, _id, email, role} = req.user

      return res.status(200).cookie('token',req.token,{maxAge:60*60*1000})
                            .cookie('cid', cid, { maxAge: 60 * 60 * 1000 })
                            .cookie('email', email,{ maxAge: 60 * 60 * 1000 })
                            .cookie('role', role,{ maxAge: 60 * 60 * 1000 })
                            .cookie('_id', _id,{ maxAge: 60 * 60 * 1000 })
                            .json({
                              success: true,
                              message: 'User logged in!'
                          })
                      } 
   catch (err) {
    next(err)
  }
  }

  failLogin = (req, res) => { res.status(400).json({
    success:false,
    message: 'Error auth'
  })}

  signOut = (req,res)=> res.status(200).clearCookie('token').clearCookie('_id').clearCookie('role').clearCookie('cid').clearCookie('email').json({
    success:true,
    message: 'Siggned out!'
  })

  current = async (req, res, next) => {
    const data = await jwt.verify(req.cookies.token, process.env.SECRET_JWT, async (error, credentials) => {
        if (error) return { message: "error to get token credentials" }
        return credentials
    })
    return res.status(200).json(data)
  }

  forgot_pass = async (req,res)=> {
    const { email } = req.body;
    
    let userDB = await User.findOne({ email: email })
    if (!userDB) {
      return res.status(404).send("User not found");
    }
  
    
    const token = Jwt.sign({ email: userDB.email }, config.privateKeyJwt, { expiresIn: "1h" });
  
  
    const subject = 'Reset Password'
    const html = `
    <p>Welcome ${userDB.name}</p>
    <p>Click <a href='http://localhost:8080/reset-pass.html?token=${token}'>Here</a> to reset password</p>
    <p>This link expires in one hour</p>
    `
    await sendMail(email, subject, html)
    res.send({status: 'success', message: 'Mail sent successfully'})
  
  }

  reset_pass = async (req, res) => {
    try {
      const token = req.body.token;
      const newPassword = req.body.newPassword;
      const confirmPassword = req.body.confirmPassword;
  
      Jwt.verify(token, config.privateKeyJwt, async (err, credentials) => {
        if (err) {
          return res.status(401).json({message:'Invalid or expired token'});
        }
  
        try {
          let user = await User.findOne({ email: credentials.email });
          if (!user) {
            return res.status(404).json({message:'User not found'});
          }
  
          if (newPassword !== confirmPassword) {
            return res.status(400).json({message:'Passwords do not match'});
          }
          
          if (compareSync(newPassword, user.password)) return res.status(400).json({message: 'The new password cannot be the same as the old one'})
  
          user.password = hashSync(newPassword, genSaltSync())
          await user.save();
  
          res.json({message:'Password reset successful'});
        } catch (error) {
          logger.error(error.message);
          res.status(500).json({message:'An error occurred on the server'});
        }
      });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({message:'An error occurred on the server'});
    }
  }


  reset_password = (req, res) => {
    const token = req.query.token
    
  
    Jwt.verify(token, config.privateKeyJwt,  (err, credencials) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
  
      // Render the password reset form
      res.render("reset-pass", { token });
    });
  }

  fail_github = (req,res)=> res.status(400).json({
    success: false,
    message:'Error auth'
  })


}

export default new AuthController()