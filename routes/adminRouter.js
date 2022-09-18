const express = require("express");
const {
  createProduct,
  createCategory,
  updateProduct,
  deleteProduct,
  createVariants,
  updateVariant,
  deleteVariant,
  createAttributes,
} = require("../controller/productController");
const { getAllUser, getUser, deleteUser } = require("../controller/userController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");
const router = express();

// desc : create new product  => return category
// route : POST /api/admin/product
// access : private - admin
router.post("/product", createProduct);

// desc : create new category
// route : POST /api/admin/product
// access : private - admin
router.post("/category", createCategory);

// desc : update product
// route : PUT /api/admin/product/:id
// access : private - admin
router.put("/product/:id", updateProduct);

// desc : delete products
// route : DEL /api/admin/prouduct/:id
// access : private - admin
router.delete("/:id", protect, checkAdmin, deleteProduct);

// desc : create variant for product
// route : POST /api/admin/variant
// access : private - admin
router.post("/variant", createVariants);

// desc : update variant for product
// route : PUT /api/admin/variant/:id
// access : private - admin
router.put("/variant/:id", updateVariant);

// desc : delete variant for product
// route : DEL /api/admin/variant
// access : private - admin
router.delete("/variant/:id", deleteVariant);

// desc : get all user
// route : GET /api/users/
// access : private - admin
router.get("/", protect,checkAdmin, getAllUser);

// desc : get user by id
// route : GET /api/users/:id/
// access : private - admin
router.get("/:id", protect, checkAdmin, getUser);


// desc : delete user
// route : DEL /api/users/:id
// access : private - admin
router.delete("/:id", protect, checkAdmin, deleteUser);

// desc : update status order
// route : PUT /api/admin/order:id
// access : private - admin
// router.put("/id", protect, checkAdmin, updateOrder);

module.exports = router;
