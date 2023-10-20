class SessionsController {

  getSession = async(req,res)=> {
    return res.status(200).json({
      success: true,
      email: req.session.email
    })
}

  login = async(req,res,next)=> {
    try {
      const { email } = req.body
      req.session.email = email
      return res.status(200).json({
        success: true,
        message: email + ' ha iniciado sesion'
      })
    } catch(error) {
      next(error)
    }
  }

  logout = async(req,res,next)=> {
    try {
      req.session.destroy()
      return res.status(200).json({
        message: 'ha cerrado sesion'
      })
    } catch (error) {
      next(error)
    }
  }


}

export default new SessionsController()