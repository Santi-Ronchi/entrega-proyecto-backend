const Productos = require('../container/productContainer');
const Producto = new Productos();
const Carrito = require('../container/cartContainer');
const carrito = new Carrito()


module.exports = {

  webCarga: (req,res)=>{
    res.render('cargaProductos')
  },
  
  createProduct: async (req, res) => {
    try {
      const prod = {producto:{
        id: Math.floor(Math.random() * 100000000000),
        nombre: req.body.nombre,
        precio: req.body.precio,
        foto: req.body.foto,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
      }}
      const id = await Producto.save(prod);
      res.redirect('/api/home/carga')
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  getProducts: async (req, res) => {
    try {
      const productos = await Producto.getAll()
      const nombre=req.user.nombre;
      //creo el carrito
      if (!req.session.carrito){
        let carritoId = await carrito.createCarrito()
        req.session.carrito = carritoId
      }
      let idCart=req.session.carrito;
      const foto= req.user.foto
      res.render('home',{nombre,productos, idCart, foto})
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  getProductByCategory: async (req, res) => {
    try {
      const productos = await Producto.getProductByCategory(req.params.cat);
      let idCart = req.session.carrito;
      const nombre = req.user.nombre;
      const foto = req.user.foto;
      res.render('home',{nombre,productos, idCart, foto});
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  getOnlyProducts: async (req, res) => { 
    try {
      const productos = await Producto.getAll()
      res.render('onlyProductos',{productos})
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      const idProduct = req.params.id;
      const productos = await Producto.getById(idProduct);
      res.render('detalleProd',{productos})
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  updateProductById: async (req, res) => {
    const idProduct = req.params.id;
    const product = req.body;
    try {
      await Producto.updateById(idProduct, product);
      res.status(200).send({
        status: 200,
        data: {
          id: idProduct,
        },
        message: 'product was updated successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  deleteProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      await Producto.deleteById(idProduct);
      res.status(200).send({
        status: 200,
        data: {
          id: idProduct
        },
        message: 'product was deteled successfully',
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  }
};