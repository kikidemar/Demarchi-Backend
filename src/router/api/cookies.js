import { request, Router } from "express";

const cookies_router = Router()

// para setear una cookie
cookies_router.get('/set', (req, res) => {
 return res.status(200).cookie(
  'nombre_de_la_clave',
  'valor_de_esa_clave',
  'objeto',
  {
    maxAge:5000,             // maxAge = tiempo de vida de la cookie (5 segundos)
    signed:true}     
 ).json({
  success: true,
  message:'cookie seteada'
 }) 
})

// para leer una cookie SIN FIRMA
cookies_router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    cookies: req.cookies
  })
})

// para leer una cookie con firma
cookies_router.get('/get', (req, res) => {
  return res.status(200).json({
    success: true,
    cookies: req.signedCookies
  })
})

// borrar una cookie

cookies_router.get('/delete', (req, res) => {
  return res.status(200).clearCookie('nombre_de_la_clave').json({
    success: true,
    messsage: 'cookie borrada'
  })
})

// para setear una cookie con mail
cookies_router.get('/set/:email', (req, res) => {

  const {email} = req.params

  return res.status(200).cookie(
   'user',
   email,
   {
     maxAge:60000,             // maxAge = tiempo de vida de la cookie (5 segundos)
     signed:true}     
  ).json({
   success: true,
   message:'cookie seteada'
  }) 
 })



export default cookies_router