const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const asyncHandler = require("express-async-handler");



const getProductDetail = asyncHandler(async(req,res)=>{
    const product = await productModel.findById(req.params.id).populate("variants").populate("colors")
    if(product){
        res.status(200)
        res.json(product)
    }
    else{
        res.status(400)
        throw new Error('alo')
    }
})

const getProductByCategory = asyncHandler(async(req,res)=>{
    const product = await productModel.find().populate('category')
    if(product){
        console.log(product)
        res.status(200)
        res.json([
            product
        ])
    }else{
        res.status(400)
        res.json({
            message : 'product can not found'
        })
    }
})

const getAllProduct = async(req,res)=>{
    const allProduct = await productModel.find().populate('category')
    const allCategory = await categoryModel.find()
    res.json({allProduct,allCategory})
}

const getProductById = asyncHandler(async (req, res) => {});
const getProductByCategorys = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  getProductById,
  getProductByCategory,
};
