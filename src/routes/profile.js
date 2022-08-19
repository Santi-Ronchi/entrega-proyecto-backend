const express = require('express');
const { chequeoAuteExistente , chequeoAutentificacion } = require('../funciones/funcAute')
const perfilRouter = express.Router();
const Usuario = require('../container/userContainer')
const usuario = new Usuario()
const multer = require('multer')


let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/imagen')
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname)
  },
})
const upload = multer({ storage: storage })


perfilRouter.get('/', chequeoAutentificacion, (req, res) => { res.render('perfil') })

perfilRouter.post('/', chequeoAutentificacion, upload.single('miArchivo'), async (req, res, next) => {
    const file = req.file
    const fileName = req.file.filename
    const user = req.user.email
    if (!file) {
      const error = new Error('please upload file')
      error.httpStatusCode = 400
      return next(error)
    }
    await usuario.agregarFoto(fileName,user)
    res.redirect('home')
  })

module.exports = perfilRouter;