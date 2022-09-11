const Products = require('../model/productModel')
const Variants = require('../model/productVariantModel')
const Category = require ('../model/categoryModel')


const createProduct = async(req,res) =>{
    const products = await Products.create(req.body)
    await products.save()
    res.json(
        {
            products
        }
    )
}



module.exports = {
    createProduct
}