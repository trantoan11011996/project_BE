var express = require('express');
const { createCategory,getAllCategory } = require('../controller/categoryController');
var router = express.Router();


// get all category
router.get('/',getAllCategory)
// create category
router.post('/',createCategory)


module.exports = router;


///api/user/admin/p