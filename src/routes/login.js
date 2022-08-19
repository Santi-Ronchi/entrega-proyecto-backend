const express = require('express');
const passport = require('passport')
const { chequeoAuteExistente , chequeoAutentificacion } = require('../funciones/funcAute')
const loginRouter = express.Router();

//routas login

loginRouter.get('/login', chequeoAuteExistente, (req, res) => {
    try {
        res.render('login')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
})

loginRouter.post('/login', 
    passport.authenticate('login', {
        successRedirect: '/api/home',
        failureRedirect: '/api/login-error',
      })
)

//rutas registrar
loginRouter.get('/registrar', chequeoAuteExistente, (req, res) => {
    try {
        res.render('register')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
})

loginRouter.post('/registrar',
      passport.authenticate('register', {
      successRedirect: '/api/login',
      failureRedirect: '/api/registrar-error',
    })
)

//routas error
loginRouter.get('/login-error', (req, res) => {
    try {
        res.render('login-error')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
})

loginRouter.get('/registrar-error', (req, res) => {
    try {
        res.render('register-error')
      } catch (error) {
        res.status(500).send({
          status: 500,
          messages: error.message,
        });
      }
})

//routas error

loginRouter.get('/logout', chequeoAutentificacion, (req, res) => {
    try {
        req.session.destroy();
        req.logout((err)=>{
            if(err){
                return (err)
            }
        })
        return res.redirect('/api/login')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
})

module.exports = loginRouter;