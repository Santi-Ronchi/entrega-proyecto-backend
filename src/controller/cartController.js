const Carrito = require('../container/cartContainer')
const carro = new Carrito()
const Productos = require('../container/productContainer')
const producto = new Productos()
const config = require('../../config')


const {createTransport} = require('nodemailer');
const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: config.ETHERUSER,
      pass: config.ETHERPASS
  }
});


const twilio = require('twilio')
const accountSid = config.TWILIOSID;
const authToken = config.TWILIOTOKEN;
const client = twilio(accountSid, authToken)


module.exports = {
    mostrarCarro: async (req, res) => {
        try {
            const data = await carro.buscarCarrito(req.session.carrito)
            const productos =[]
            const produs = await producto.getAll() 
            data.forEach(element => {
                productos.push(produs.find(item => item.id == element))   
            })
            const nombre = req.user.nombre;
            const foto = req.user.foto;
            let idCart = req.session.carrito;          
            res.render('carrito', {nombre, foto, idCart, productos })
        } catch (error) {
            res.status(500).send({
            status: 500,
            messages: error.message,
            });
        }
    },

    efectuarCompra: async (req, res) => {
        const cart = carro.buscarCarrito(req.session.carrito)
        // mandar mail
        const usuarioExistente = {nombre: req.user.nombre, email: req.user.username, direccion: req.user.direccion, edad: req.user.edad, telefono: req.user.telefono }
        const mailOptions = { 
          from: 'Servidor Node.js',
          to: config.ETHERUSER,
          subject: 'Compra Terminada',
          html: `nuevo pedido de NOMBRE:${usuarioExistente.nombre}, EMAIL:${usuarioExistente.email},fecha de nacimiento:${usuarioExistente.edad}, direccion: ${usuarioExistente.direccion}, telefono: ${usuarioExistente.telefono}. Pedido:${cart}`
        }
        await transporter.sendMail(mailOptions)

        // mandar whatsapp al cliente
        try {
            const message = await client.messages.create({
                body: 'Su pedido ha sido recibido exitosamente y se encuentra en proceso.!',
                from: 'whatsapp:' + config.TWILIONUMBER,
                to: `whatsapp:+${usuarioExistente.telefono}`
            })
        } catch (error) {
            console.log(error)
        }
        //crear uno nuevo y asignar
        let carritoId = await carro.createCarrito()
        req.session.carrito = carritoId
        res.redirect('/api/home')
    }

}


