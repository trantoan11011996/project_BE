var express = require('express');
const { createCategory } = require('../controller/categoryController');
var router = express.Router();


// get all product
router.get('/')
// create product

router.post('/',createCategory)


module.exports = router;


