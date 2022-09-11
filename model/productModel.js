const mongoose = require('mongoose')
const {Schema} = mongoose
const productSchema = mongoose.Schema({
   name : {
     type : String,
     require : true
   },
   desc  : {
     type : String,
     require : true,
   },
   image : [
    {
        type: String,
        require : true
    }
   ],
   category : {type : Schema.Types.ObjectId, ref : "Category"},
   product : [{type : Schema.Types.ObjectId , ref : "Variants"}]
})


const Products = mongoose.model('Products',productSchema)
module.exports = Products