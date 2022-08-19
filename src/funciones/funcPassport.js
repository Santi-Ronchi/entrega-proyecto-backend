const LocalStrategy = require('passport-local').Strategy
const Usuario = require('../container/userContainer')
const usuario = new Usuario()
const { isValidPassword , createHash } = require('./funcBcrypt')
const config = require('../../config')
let contadorDes = 1
let contadorSer = 1
/* ETHEREAL */

const {createTransport} = require('nodemailer');
const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: config.ETHERUSER,
      pass: config.ETHERPASS
  }
});


const setUpPassport = (passport) => {
    
    passport.serializeUser((usuario, done) => {
        done(null, usuario.email)
    })
      
    passport.deserializeUser(async (email, done) => {
        const usuarioDz = await usuario.buscarUsuario(email)
        done(null, usuarioDz)
    })
    
    
    passport.use(
        'register',
        new LocalStrategy(
          { passReqToCallback: true },
          async (req, username, password, done) => {
            const existe = await usuario.buscarUsuario(username)
            if (existe) {
              return done(null, false)
            } else {
              const usuarioExistente = {nombre: req.body.nombre, email: username, password: createHash(password),direccion: req.body.direccion, edad: req.body.edad, telefono: req.body.telefono , foto: 'perfil.jpg' }
              const data = await usuario.createUsuario(usuarioExistente)
              //manda mail a ethereal
              const mailOptions = { 
                from: 'Servidor Node.js',
                to: config.ETHERUSER,
                subject: 'Nuevo Registro',
                html: `<h1 style="color: blue;">NOMBRE:${usuarioExistente.nombre}, EMAIL:${usuarioExistente.email},fecha de nacimiento:${usuarioExistente.edad}, direccion: ${usuarioExistente.direccion}, telefono: ${usuarioExistente.telefono}</h1>`
              }
              await transporter.sendMail(mailOptions)
              
              done(null, { email: data.email })
            }
          }
        )
      )
      
    passport.use(
        'login',
        new LocalStrategy( async (username, password, done) => {
          const existe = await usuario.buscarUsuario(username)
          if (!existe) {
            return done(null, false)
          }
      
          if (!isValidPassword(existe, password)){
            return done(null, false)
          } 
          return done(null, {nombre:existe.nombre,email:existe.email,foto:existe.foto})
        })
    )
}

module.exports = setUpPassport