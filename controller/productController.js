const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel")
const asyncHandler = require("express-async-handler");



let arrAtributes = []   
const getProductDetail = asyncHandler(async(req,res)=>{
    const product = await productModel.findById(req.params.id).populate('variants').populate('category')
    const variants = product.variants
    for(let i = 0 ; i<variants.length; i++){
        const att = variants[i].attributes
        for(let j = 0 ; j < att.length;j++){
            arrAtributes.push(att[j]);
        }
    }
    console.log(arrAtributes)
    var seen = {};
    arrAtributes = arrAtributes.filter(function(item) {
        var previous;

    // 
    if (seen.hasOwnProperty(item.name)) {
        // Yes, grab it and add this value to it
        previous = seen[item.name]
        previous.value.push(item.value);

        // Don't keep this item, we've merged it into the previous one
        return false;
    }

    // item.value probably isn't an array; make it one for consistency
    if (!Array.isArray(item.value)) {
        item.value = [item.value];
    }

    // Remember that we've seen it
    seen[item.name] = item;

    // Keep this one, we'll merge any others that match into it
    return true;
});
    if(product){
        res.json({product,arrAtributes})
    }
    else{
        res.status(404)
        throw new Error('product cant not found')
    }
})



const getProductByCategory = asyncHandler(async(req,res)=>{
    const category = await categoryModel.findById(req.params.id)
    if(category){
        const product = await productModel.find({category : category._id})   
        res.json(product)
    }else{
        res.status(404)
        res.json({
            message : 'product can not found'
        })
    }
})

const getAllProduct = asyncHandler(async(req,res)=>{
    const pageSize = 16
    const page = req.query.pageNumber || 1
    const allProduct = await productModel.find().limit(pageSize).skip(pageSize*(page -1)).populate('category','name')
    const allCategory = await categoryModel.find()
    res.json({allProduct,allCategory})
})

const createProduct = asyncHandler(async(req,res) =>{
    const getAllCategory = await categoryModel.find()
    const product = await productModel.create(req.body)
    res.json({getAllCategory,product})
    
})

const createVariants =asyncHandler(async(req,res) =>{
    const id_product = req.body.productId

    try{
        const product = await productModel.findById(id_product).populate("variants")
        console.log('product',product);
        if(product){
            const variant = await variantModel.create(req.body)
            await variant.save()
            product.variants.push(variant)
            await product.save()
            // const cloneVariants = [...product.variants]
            // const totalCountInStock = cloneVariants.reduce((total,value)=>{
            //     return total + value.countInStock
            // },0)
            // product.countInStock = totalCountInStock
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
        await product.save()
        const accessories = await productModel.findById(req.body.accessories)
        if(accessories){
            product.accessories.push(accessories)
            await product.save()
            res.json(product)
        }
    }else{
        res.status(404)
        throw new Error('product not found')
    }
})

const updateVariant = asyncHandler(async(req,res)=>{
    /////    
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await productModel.findByIdAndRemove(req.params._id)
    res.json({
        message : "xóa thành công"
    })
})

const deleteVariant = asyncHandler(async(req,res)=>{    
    /////    
})

const getVariant = asyncHandler(async(req,res)=>{
    const variant = await variantModel.findById(req.params.id)
    res.json(variant)
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
  getVariant
};
