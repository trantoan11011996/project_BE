const Products = require('../model/productModel')
const Variants = require('../model/productVariantModel')
const Category = require ('../model/categoryModel')


const createCategory = async(req,res) =>{
    const category = await Category.create(req.body)
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