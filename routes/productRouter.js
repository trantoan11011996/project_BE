var express = require('express');
const { createProduct, getAllProduct } = require('../controller/productController');
const { createVariants } = require('../controller/variantController');
const { protect, checkAdmin } = require('../middleware/authMiddleware');
var router = express.Router();

// 1.
// desc : get all product
// route : GET /api/products/
// access : public

router.get('/')
// 2.
// desc : get product detail
// route GET /api/products/:id
// access : public

router.get('/:id',getProductDetail)
// 3.
// desc : get product by category
// route : GET /api/products/category/:name
// access : public

router.get('/category/:name',getProductByCategory)


module.exports = router;



