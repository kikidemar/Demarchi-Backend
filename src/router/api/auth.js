import { Router } from 'express'
// import User from '../../models/User.js'
import validator from '../../middlewares/validator.js'
import pass_is_8 from '../../middlewares/pass_is_8.js'
import createToken from '../../middlewares/createToken.js'
import create_hash from '../../middlewares/create_hash.js'
// import is_valid_pass from '../../middlewares/is_valid_pass.js'
import passport from 'passport'
import validator_signin from '../../middlewares/validator_signin.js'
import passIsOk from '../../middlewares/passIsOk.js'
import passport_call from '../../middlewares/passport_call.js'
import AuthController from '../../controllers/auth.controller.js'
import compression from 'express-compression'

const auth_router = Router()
auth_router.use(compression({
  brotli:{enabled: true,
          zlib: {}}
}))

// Sign Up

auth_router.post(
  '/register', 
  validator, 
  pass_is_8, 
  create_hash, 
  passport.authenticate(
    'register',
    { failureRedirect: 'api/auth/fail-register'}
  ), 
  AuthController.register
)


auth_router.get('/fail-register', AuthController.failRegister)



// Sign In

auth_router.post(
  '/login',
  validator_signin,
  pass_is_8,
  passport.authenticate('login', { failureRedirect: '/api/auth/fail-login'}), 
  passIsOk,
  createToken,
  AuthController.login)


auth_router.get('/fail-login', AuthController.failLogin)



// Sign out

// auth_router.post('/signout',async(req,res,next)=>{
//   try {
//       if (req.session.email) {
//           req.session.destroy()
//           return res.status(200).json({
//               success: true,
//               message: 'user signed out!'
//           })
//       } else {
//           return res.status(404).json({
//               success: false,
//               message: 'user not found!'
//           })
//       }
//   } catch (error) {
//       next(error)
//   }
// })

auth_router.post(
    '/signout', 
    passport_call('jwt',{session:false}),
    AuthController.signOut
    )



auth_router.get('/github', passport.authenticate('github', { scope:['user:email']}), (req, res) => {})

auth_router.get(
  '/github/callback', 
  passport.authenticate('github', { failureRedirect:'/api/auth/fail-register-github'}),
  (req, res) => res.status(200).redirect('/')
)

auth_router.get('/fail-register-github', (req,res)=> res.status(400).json({
  success: false,
  message:'Error auth'
}))

auth_router.get("/current", passport_call("jwt"), AuthController.current)

export default auth_router