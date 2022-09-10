const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

})


const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders