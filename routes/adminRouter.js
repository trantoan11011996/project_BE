const express = require("express");
const {
  updateOrder,
  getAllOrder,
  getDetailOrder,
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

// 0
//desc : get all category
//route : GET /api/admin/category
//access : public
/**
 * @swagger
 * /api/admin/category:
 *   get:
 *     summary: Get all category
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description : Error
 */
router.get("/category", protect, getAllCategory);

// 1
// desc : create new category
// route : POST /api/admin/category
// access : private - admin
/**
 * @swagger
 * /api/admin/category:
 *   post:
 *     summary: Create new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: V8 Angry Miao Products
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.post("/category", protect, checkAdmin, createCategory);

// 2
// desc : create new product  => return category
// route : POST /api/admin/product
// access : private - admin
/**
 * @swagger
 * /api/admin/product:
 *   post:
 *     summary: Create new product
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cyberboard R3
 *               imageMain:
 *                 type: string
 *                 example: https://cdn.shopify.com/s/files/1/0299/9497/5365/products/5-bwNFBPh_360x.jpg?v=1640018577
 *               category:
 *                 type: string
 *                 example: 6329c9d27145d2bac1c7ce05
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.post("/product", protect, checkAdmin, createProduct);

// 3
// desc : update product
// route : PUT /api/admin/product/:id
// access : private - admin
/**
 * @swagger
 * /api/admin/product/{id}:
 *   put:
 *     summary: Update product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: newName
 *               imageMain:
 *                 type: string
 *                 example: https://cdn.shopify.com/s/files/1/0299/9497/5365/products/DHU_6185_4d3981f4-0179-426b-a837-e0e0cea7a19d_360x.jpg?v=1651902233
 *               category:
 *                 type: string
 *                 example: 6329c9ae7145d2bac1c7cdf6
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.put("/product/:id", protect, checkAdmin, updateProduct);

// 4
// desc : delete products
// route : DEL /api/admin/product/:id
// access : private - admin
/**
 * @swagger
 * /api/admin/product/{id}:
 *   delete:
 *     summary: Delete product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 */
router.delete("/product/:id", protect, checkAdmin, deleteProduct);

// 5
// desc : create variant for product
// route : POST /api/admin/variant
// access : private - admin
/**
 * @swagger
 * /api/admin/variant:
 *   post:
 *     summary: Create new variant
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 6329f03f8aedc793ed5e339a
 *               price:
 *                 type: integer
 *                 example: 20
 *               countInStock:
 *                 type: integer
 *                 example: 50
 *               attributes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Color
 *                     value:
 *                       type: string
 *                       example: Black
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.post("/variant", protect, checkAdmin, createVariants);

// 6
// desc : update variant for product
// route : PUT /api/admin/variant/:id
// access : private - admin
/**
 * @swagger
 * /api/admin/variant/{id}:
 *   put:
 *     summary: Update variant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idVariant:
 *                 type: string
 *               price:
 *                 type: integer
 *               discountPrice:
 *                 type: integer
 *               countInStock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.put("/variant/:id", protect, checkAdmin, updateVariant);

// 7
// desc : delete variant for product
// route : DEL /api/admin/variant
// access : private - admin
/**
 * @swagger
 * /api/admin/variant/{id}:
 *   delete:
 *     summary: Delete variant
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: variant id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 */
router.delete("/variant/:id", protect, checkAdmin, deleteVariant);

// 8
// desc : get all user
// route : GET /api/admin/users/
// access : private - admin
/**
 * @swagger
 * /api/admin/user:
 *   get:
 *     summary: Get all user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description : Error
 */
router.get("/user", protect, checkAdmin, getAllUser);

// 9
// desc : get user by id
// route : GET /api/users/:id/
// access : private - admin
/**
 * @swagger
 * /api/admin/user/{id}:
 *   get:
 *     summary: Get all user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: user id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description : Error
 */
router.get("/user/:id", protect, checkAdmin, getUser);

// 10
// desc : delete user
// route : DEL /api/users/:id
// access : private - admin
/**
 * @swagger
 * /api/admin/user/{id}:
 *   delete:
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: user id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 */
router.delete("/user/:id", protect, checkAdmin, deleteUser);

// 11
// desc : get order
// route : GET /api/admin/order
// access : private - admin
/**
 * @swagger
 * /api/admin/order:
 *   get:
 *     summary: Get all order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description : Error
 */
router.get("/order", protect, checkAdmin, getAllOrder);

// 12
// desc : get order by id
// route : GET /api/admin/order/:id
// access : private - admin
/**
 * @swagger
 * /api/admin/order/{id}:
 *   get:
 *     summary: Get all order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: order id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description : Error
 */
router.get("/order/:id", protect, checkAdmin, getDetailOrder);

// 13
// desc : update status order
// route : PUT /api/admin/order:id
// access : private - admin
/**
 * @swagger
 * /api/admin/order/{id}:
 *   put:
 *     summary: Update order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: order id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: shipping
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.put("/order/:id", protect, checkAdmin, updateOrder);

module.exports = router;
