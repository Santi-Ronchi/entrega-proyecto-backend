const express = require('express');
const { chequeoAutentificacion } = require('../funciones/funcAute');
const homeRouter = express.Router();
const {
  createProduct,
  webCarga,
  getProducts,
  getOnlyProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductByCategory,
} = require('../controller/productController');


homeRouter.get('/', chequeoAutentificacion, getProducts);
homeRouter.get('/onlyProducts', getOnlyProducts);
homeRouter.get('/:cat', chequeoAutentificacion, getProductByCategory);
homeRouter.get('/detalle/:id', chequeoAutentificacion, getProductById);
homeRouter.post('/carga/', chequeoAutentificacion, createProduct);
homeRouter.delete('/carga/:id', chequeoAutentificacion, deleteProductById);
homeRouter.post('/carga/:id', chequeoAutentificacion, updateProductById);
homeRouter.get('/carga/', chequeoAutentificacion, webCarga);

module.exports = homeRouter;