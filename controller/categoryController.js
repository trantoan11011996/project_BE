const productModel = require('../model/productModel')
const variantModel = require('../model/productVariantModel')
const categoryModel = require ('../model/categoryModel')


const createCategory = async(req,res) =>{
    const category = await categoryModel.create(req.body)
    await category.save()
    res.json(
        {
             category
        }
    )
} 



module.exports = {
  createCategory
}