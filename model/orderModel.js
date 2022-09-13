const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    
})


const orderModel = mongoose.model('Order',orderSchema)
module.exports = orderModel