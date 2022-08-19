const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const config = require('./config')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

/*----------- Server -----------*/
if (config.MODO == 'CLUSTER' && cluster.isPrimary){
  console.log(`Master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker) => {
    cluster.fork()
    console.log(`worker ${worker.process.pid} died`)
  })
} else {


/* APP */
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))


  /* SESSION */
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(
  session({
    secret: '1234567890!@#$%^&*()',
    cookie:{
      httpOnly: false,
      secure:false,
      maxAge: 600000
    },
    rolling:true,
    resave: true,
    saveUninitialized: true,
  })
)

/* TWILIO */
const twilio = require('twilio')

const accountSid = config.TWILIOSID;
const authToken = config.TWILIOTOKEN;
const client = twilio(accountSid, authToken)


/* PASSPORT */
const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
const setupPassport = require('./src/funciones/funcPassport');
setupPassport(passport);


// socket io
const Carrito = require('./src/container/cartContainer')
const carrito = new Carrito();


io.on('connection', async (socket) => {
  
  // agregar al carrito
  socket.on('agregarProducto', async valor => {
   await carrito.addProductToCart(valor.idCart, valor.idProd)
  })

  // eliminar del carrito
  socket.on('eliminarProductos', async valor => {
    await carrito.deleteProductCart(valor.idCart, valor.idProd)
  })

})

/* HANDLEBARS */
const hbs = require('express-handlebars')
app.set('views', './src/views')
app.engine(
   '.hbs',
    hbs.engine({
      defaultLayout: 'main',
      layoutsDir: './src/views/layouts',
      partialsDir: './src/views/partials',
      extname: '.hbs',
    })
)

app.set('view engine', '.hbs')

/* RUTAS */
const loginRouter = require('./src/routes/login')
const homeRouter = require('./src/routes/home')
const cartRouter = require('./src/routes/cart')
const perfilRouter = require('./src/routes/profile')

app.use('/api', loginRouter);
app.use('/api/home', homeRouter);
app.use('/api/carrito', cartRouter)
app.use('/api/perfil', perfilRouter);

app.use('/',(req, res) => {
  try {
      res.redirect('/api/login')
  } catch (error) {
    res.status(500).send({
      status: 500,
      messages: error.message,
    });
  }
})

/* SERVER */
const numCPUs = require('os').cpus().length

const connectedServer = httpServer.listen(config.PORT, () => {
  console.log(`servidor levantado en PORT:${config.PORT} y numero de processo:${numCPUs}`)
})

connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

}