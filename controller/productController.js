const productModel = require('../model/productModel')
const variantModel = require('../model/productVariantModel')
const categoryModel = require ('../model/categoryModel')


const createProduct = async(req,res) =>{
    const product = await productModel.create(req.body)
    await product.save()
    res.json(
        {
            product
        }
    )
}
const getAll = async(req,res)=>{
    const allProduct = await productModel.find().populate('category',"-_id",).populate('option')
    res.json(allProduct)
}


module.exports = {
    createProduct,
    getAll
}