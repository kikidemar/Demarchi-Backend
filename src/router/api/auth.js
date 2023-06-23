import { Router } from 'express'
import User from '../../models/User.js'
import validator from '../../middlewares/validator.js'
import pass_is_8 from '../../middlewares/pass_is_8.js'
import create_hash from '../../middlewares/create_hash.js'
import is_valid_pass from '../../middlewares/is_valid_pass.js'
import passport from 'passport'

const auth_router = Router()

// Sign Up

auth_router.post(
  '/signup', 
  validator, 
  pass_is_8, 
  create_hash, 
  passport.authenticate(
    'signup',
    { failureRedirect: 'api/auth/fail-signup'}
  ), 
  (req,res)=> res.status(201).json({
    success: true,
    message: 'user created!'
})
)


auth_router.get('/fail-signup', (req, res) => { res.status(400).json({
  success:false,
  message: ' Error auth'
})})



// Sign In

auth_router.post(
  '/signin',
  passport.authenticate('signin', { failureRedirect: '/api/auth/fail-signin'}), 
  is_valid_pass, 
  (req, res, next) => {
    try {
      const {email} = req.body
      req.session.email = email
      req.session.role = req.user.role
      return res.status(200).json({
        success: true,
        message: 'User signed in!'
        })
      } 
   catch (err) {
    next(err)
  }
})


auth_router.get('/fail-signin', (req, res) => { res.status(400).json({
  success:false,
  message: ' Error auth'
})})



// Sign out

auth_router.post('/signout',async(req,res,next)=>{
  try {
      if (req.session.email) {
          req.session.destroy()
          return res.status(200).json({
              success: true,
              message: 'user signed out!'
          })
      } else {
          return res.status(404).json({
              success: false,
              message: 'user not found!'
          })
      }
  } catch (error) {
      next(error)
  }
})



export default auth_router