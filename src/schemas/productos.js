const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    producto: {
        id: {type:Number, required:true},
        nombre: {type:String, required:true, max:127},
        precio: {type:Number, required:true},
        foto: {type: String, required:true, max:127},
        descripcion: { type: String, required:true, max:127},
        categoria: {type:String, required:true, max:127},
    }
})

module.exports = mongoose.model('products', productoSchema)