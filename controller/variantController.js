const productModel = require('../model/productModel')
const variantModel = require('../model/productVariantModel')
const categoryModel = require ('../model/categoryModel')
const asyncHandler = require('express-async-handler')


const createVariants =asyncHandler(async(req,res) =>{
    const id_product = req.body.productId

    try{
        const product = await productModel.findById(id_product).populate('category')
        console.log('product',product);
        if(product){
            const variant = await variantModel.create(req.body)
            await variant.save()
            product.option.push(variant)
            await product.save()
            res.json({
                product
            })
        }
        else{
            res.status(404)
            throw new Error('loi')
        }
    }catch(err){
        throw new Error(err)
    }
    
})



module.exports = {
    createVariants
}

