const express = require("express");
const {
  updateOrder,
  getAllOrder,
  deleteOrder,
  getDetailOrder,
  createOrder,
} = require("../controller/orderController");
const {
  createCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  createVariants,
  updateVariant,
  deleteVariant,
  getAllCategory,
} = require("../controller/productController");
const {
  getAllUser,
  getUser,
  deleteUser,
} = require("../controller/userController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");
const router = express();

//desc : get all category
//route : GET /api/admin/category
//access : public
router.get("/category", protect, getAllCategory);
// desc : create new category
// route : POST /api/admin/product
// access : private - admin
router.post("/category", protect, checkAdmin, createCategory);

// desc : create new product  => return category
// route : POST /api/admin/product
// access : private - admin
router.post("/product", protect, checkAdmin, createProduct);

// 3
// desc : update product
// route : PUT /api/admin/product/:id
// access : private - admin
router.put("/product/:id", protect, checkAdmin, updateProduct);

// 4
// desc : delete products
// route : DEL /api/admin/prouduct/:id
// access : private - admin
router.delete("/product/:id", protect, checkAdmin, deleteProduct);

// 5
// desc : create variant for product
// route : POST /api/admin/variant
// access : private - admin
router.post("/variant", protect, checkAdmin, createVariants);

// 6
// desc : update variant for product
// route : PUT /api/admin/variant/:id
// access : private - admin
router.put("/variant/:id", protect, checkAdmin, updateVariant);

// 7
// desc : delete variant for product
// route : DEL /api/admin/variant
// access : private - admin
router.delete("/variant/:id", protect, checkAdmin, deleteVariant);

// 8
// desc : get all user
// route : GET /api/users/
// access : private - admin
router.get("/user", protect, checkAdmin, getAllUser);

// 9
// desc : get user by id
// route : GET /api/users/:id/
// access : private - admin
router.get("/user/:id", protect, checkAdmin, getUser);

// 10
// desc : delete user
// route : DEL /api/users/:id
// access : private - admin
router.delete("/user/:id", protect, checkAdmin, deleteUser);

// 11
// desc : get order
// route : GET /api/admin/order
// access : private - admin
router.get("/order", protect, checkAdmin, getAllOrder);

// 12
// desc : create order
// route : POST /api/admin/order:id
// access : private - admin
router.post("/order", protect, createOrder);

// 13
// desc : update status order
// route : PUT /api/admin/order:id
// access : private - admin
router.put("/order/:id", protect, checkAdmin, updateOrder);

// 14
// desc : delete order
// route : DEL /api/admin/order:id
// access : private - login
router.delete("/order/:id", protect, checkAdmin, deleteOrder);

module.exports = router;
