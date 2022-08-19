const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    productos: { type: Array, require: false }
    })

module.exports = mongoose.model('cart', cartSchema)
