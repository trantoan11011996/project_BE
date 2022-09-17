
const productModel = require('../model/productModel')
const variantModel = require('../model/productVariantModel')
const categoryModel = require ('../model/categoryModel')
const colorModel = require('../model/colorVariantModel')
const asyncHandler = require('express-async-handler')
const generateToken = require('../unitls/generateToken')


const creatAdmin = asyncHandler(async(req,res)=>{
    const {body} = req
    const userExist = await adminModel.findOne({email})
    if(userExist){
        res.status(400)
        res.json({
            message : "user have been exist"
        })
    }
    const newUser = await adminModel.create(body)
    if(newUser){
        res.status(200)
        res.json({
            newUser,
            token : generateToken(newUser._id)
        })
    }else{
        res.status(200)
        throw new Error('ivalid register user')
    }
})
const createProduct = async(req,res) =>{
    const product = await productModel.create(req.body)
    // await product.save()
    const varianst = product.variants
    const variantsLength = varianst.length 
    if(variantsLength == 0){
       product.countInStock = req.body.countInStock
       await product.save()
       res.json(product)
    }
}

const createCategory = async(req,res) =>{
    const category = await categoryModel.create(req.body)
    await category.save()
    res.json(
        category
    )
} 


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

const createColors =asyncHandler(async(req,res) =>{
    const id_product = req.body.productId

    try{
        const product = await productModel.findById(id_product).populate('category')
        console.log('product',product);
        if(product){
            const color = await colorModel.create(req.body)
            await color.save()
            product.colors.push(color)
            await product.save()
            res.json(
                color
            )
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
    creatAdmin,
    createProduct,
    createCategory,
    updateProduct,
    deleteProduct,
    createVariants,
    createColors,
    updateVariant,
    deleteVariant,
}
