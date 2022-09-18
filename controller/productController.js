const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel")
const asyncHandler = require("express-async-handler");



const getProductDetail = asyncHandler(async(req,res)=>{
    const product = await productModel.findById(req.params.id).populate("variants")
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

const getAllProduct = asyncHandler(async(req,res)=>{
    const allProduct = await productModel.find().populate('category')
    const allCategory = await categoryModel.find()
    res.json({allProduct,allCategory})
})

const createProduct = asyncHandler(async(req,res) =>{
    const product = await productModel.create(req.body)
    // await product.save()
    const varianst = product.variants
    const variantsLength = varianst.length 
    if(variantsLength == 0){
       product.countInStock = req.body.countInStock
       await product.save()
       res.json(product)
    }
})

const createCategory = asyncHandler(async(req,res) =>{
    const category = await categoryModel.create(req.body)
    await category.save()
    res.json(
        category
    )
})


const updateProduct = asyncHandler(async(req,res)=>{
    const product = await productModel.findById(req.params._id)
    if(product){
        const accessories = await productModel.findById(req.body.accessories)
        if(accessories){
            product.accessories.push(accessories)
            await product.save()
            res.json(product)
        }
    }else{
        res.status(400)
        throw new Error('product not found')
    }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await productModel.findByIdAndRemove(req.params._id)
})

const createVariants =asyncHandler(async(req,res) =>{
    const id_product = req.body.productId

    try{
        const product = await productModel.findById(id_product).populate("variants","countInStock")
        console.log('product',product);
        if(product){
            const variant = await variantModel.create(req.body)
            await variant.save()
            product.variants.push(variant)
            await product.save()
            const cloneVariants = [...product.variants]
            const totalCountInStock = cloneVariants.reduce((total,value)=>{
                return total + value.countInStock
            },0)
            product.countInStock = totalCountInStock
            await product.save()
            res.json(product)
        }
        else{
            res.status(404)
            throw new Error('loi')
        }
    }catch(err){
        throw new Error(err)
    }
    
})

const updateVariant = asyncHandler(async(req,res)=>{

})

const deleteVariant = asyncHandler(async(req,res)=>{    
    
})



module.exports = {
  getProductDetail,
  getAllProduct,
  getProductByCategory,
  createProduct,
  createCategory,
  createVariants,
  deleteProduct,
  updateProduct,
  updateVariant,
  deleteVariant,
};
