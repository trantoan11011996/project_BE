const express = require('express')
const router = express()

//4
// desc : create new product  => return category 
// route : POST /api/admin/product
// access : private - admin
router.post('/',protect,checkAdmin,createProduct)

// 5.
// desc : update product
// route : PUT /api/admin/product/:id
// access : private - admin
router.put('/product/:id',protect,checkAdmin,updateProduct)

// 6.
// desc : delete products
// route : DEL /api/admin/prouduct/:id
// access : private - admin
router.delete('/:id',protect,checkAdmin,deleteProduct)

// 7. 
// desc : create variant for product
// route : POST /api/admin/
// access : private - admin
router.post('/variant',protect,checkAdmin,createVariants)

// 8.
// desc : update variant for product
// route : PUT /api/admin/variant/:id
// access : private - admin
router.put('/variant/:id',protect,checkAdmin,updateVariant)

// 9.
// desc : delete variant for product
// route : DEL /api/admin/variant
// access : private - admin
router.delete('/variant/:id',protect,checkAdmin,deleteVariant)


module.exports = router;