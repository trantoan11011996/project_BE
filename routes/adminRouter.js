const express = require("express");
const {
  creatAdmin,
  createProduct,
  createCategory,
  updateProduct,
  deleteProduct,
  createVariants,
  updateVariant,
  deleteVariant,
  createColors,
} = require("../controller/adminController");
const router = express();
const { protect, checkAdmin } = require("../middleware/authMiddleware");



// create admin
router.post('/',creatAdmin)

//4
// desc : create new product  => return category
// route : POST /api/admin/product
// access : private - admin
router.post("/product", createProduct);

//5
// desc : create new category
// route : POST /api/admin/product
// access : private - admin
router.post("/category", createCategory);


// 6.
// desc : update product
// route : PUT /api/admin/product/:id
// access : private - admin
router.put("/product/:id", updateProduct);

// 7.
// desc : delete products
// route : DEL /api/admin/prouduct/:id
// access : private - admin
router.delete("/:id", protect, checkAdmin, deleteProduct);

// 8.
// desc : create variant for product
// route : POST /api/admin/
// access : private - admin
router.post("/variant", createVariants);

//9
// desc : create color for product
// route : POST /api/admin/
// access : private - admin
router.post("/color", createColors);
// 9.
// desc : update variant for product
// route : PUT /api/admin/variant/:id
// access : private - admin
router.put("/variant/:id", updateVariant);

// 10.
// desc : delete variant for product
// route : DEL /api/admin/variant
// access : private - admin
router.delete("/variant/:id", deleteVariant);





module.exports = router;
