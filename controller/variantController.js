const Products = require('../model/productModel')
const Variants = require('../model/productVariantModel')
const Category = require ('../model/categoryModel')
const asyncHandler = require('express-async-handler')


const createVariants =asyncHandler(async(req,res) =>{
    const id_product = req.body.productId

    try{
        const product = await Products.findById(id_product).populate('category').populate('product')
        if(product){
            const variant = await Variants.create(req.body)
            await variant.save()
            product.product.push(variant)
            await product.save()
            res.json({
                variant,
                product
            })
        }
        else{
            res.status(400)
            throw new Error('lỗi đâu đó')
        }
    }catch(err){
        throw new Error(err)
    }
    
})



module.exports = {
    createVariants
}