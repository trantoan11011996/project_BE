const express = require("express");
const { protect, checkAdmin } = require("../middleware/authMiddleware");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  createVariant,
  updateVariant,
  deleteVariant,
  getAllOrder,
  updateOrder,
} = require("../controller/adminController");
const router = express();

// 1.
// desc : create new product  => return category
// route : POST /api/admin/product
// access : private - admin
router.post("/product", protect, checkAdmin, createProduct);

// 2.
// desc : update product
// route : PUT /api/admin/product/:id
// access : private - admin
router.put("/product/:id", protect, checkAdmin, updateProduct);

// 3.
// desc : delete products
// route : DEL /api/admin/prouduct/:id
// access : private - admin
router.delete("/product/:id", protect, checkAdmin, deleteProduct);

// 4.
// desc : create variant for product
// route : POST /api/admin/variant
// access : private - admin
router.post("/variant", protect, checkAdmin, createVariant);

// 5.
// desc : update variant for product
// route : PUT /api/admin/variant/:id
// access : private - admin
router.put("/variant/:id", protect, checkAdmin, updateVariant);

// 6.
// desc : delete variant for product
// route : DEL /api/admin/variant
// access : private - admin
router.delete("/variant/:id", protect, checkAdmin, deleteVariant);

// 7.
// desc : get all order
// route : GET /api/admin/order
// access : private - admin
router.get("/", protect, checkAdmin, getAllOrder);

// 8.
// desc : update status order
// route : PUT /api/admin/order:id
// access : private - admin
router.put("/id", protect, checkAdmin, updateOrder);

module.exports = router;
