const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        }
    },
    {collection : "category"}
)


const categoryModel = mongoose.model('Category',categorySchema)
module.exports = categoryModel