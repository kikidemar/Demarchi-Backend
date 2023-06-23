import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../models/User.js'

export default function () {
  passport.serializeUser(
    (user, done) => done(null, user._id)
  )
  passport.deserializeUser(
    async (id, done) => {
      const user = await User.findById(id)
      return done(null, user)
    }
  )
  passport.use(
      'signup',
      new Strategy(
        { passReqToCallback: true, usernameField:'email' },
        async (req, username, password, done) => {
          try {
              let one = await User.findOne({ email: username})  // tambien se puede pasar email:req.body.email
              if (!one) {
                let user = await User.create(req.body)
                return done(null, user)
              }
              return done(null, false)

          } catch(error){
            return done(error)
          }
        }
      ))
}

passport.use(
  'signin',
  new Strategy(
      { usernameField:'email' },
      async (username,password,done) => {
          try {
              let one = await User.findOne({ email:username })
              if (one) {
                  return done(null,one)
              }
              return done(null,false)
          } catch (error) {
              return done(error)
          }
      }
  )
)