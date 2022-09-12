var express = require('express');
const { createProduct, getAll } = require('../controller/productController');
const { createVariants } = require('../controller/variantController');
var router = express.Router();


// get all product
router.get('/')
// create product
router.post('/',createProduct)

router.post('/variants',createVariants)
//create variant

//get all
router.get('/',getAll)

module.exports = router;


