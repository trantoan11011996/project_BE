var express = require('express');
const { getAllProduct, getProductDetail, getProductByCategory, getVariant } = require('../controller/productController');


var router = express.Router();

// 1.
// desc : get all product
// route : GET /api/products/
// access : public

router.get('/',getAllProduct)
// 2.
// desc : get product detail
// route GET /api/products/:id
// access : public

router.get('/:id', getProductDetail)

// 3.
// desc : get product by category
// route : GET /api/products/category/:name
// access : public

router.get("/category/:id", getProductByCategory);

router.get("/variant/:id",getVariant)
module.exports = router;
