const express = require('express');
const cartRouter = express.Router();
const { chequeoAutentificacion } = require('../funciones/funcAute')
const {
    mostrarCarro,
    efectuarCompra,
  } = require('../controller/cartController');
cartRouter.get('/', chequeoAutentificacion, mostrarCarro)
cartRouter.post('/', chequeoAutentificacion, efectuarCompra)
module.exports = cartRouter;