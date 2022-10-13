var express = require("express");
const {
  getAllProduct,
  getProductDetail,
  getProductByCategory,
  getVariant,
} = require("../controller/productController");

var router = express.Router();

// 1.
// desc : get all product
// route : GET /api/products/
// access : public
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all product
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description : Error
 */
router.get("/", getAllProduct);

// 2.
// desc : get product detail
// route GET /api/products/:id
// access : public
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product
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
router.get("/:id", getProductDetail);

// 3.
// desc : get product by category
// route : GET /api/products/category/:id
// access : public
/**
 * @swagger
 * /api/products/category/{id}:
 *   get:
 *     summary: Get product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: category id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Fail
 */
router.get("/category/:id", getProductByCategory);

// 4
// desc : get variant by id
// route : GET /api/products/variant/:id
// access : public
/**
 * @swagger
 * /api/products/variant/{id}:
 *   get:
 *     summary: Get variant
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
router.get("/variant/:id", getVariant);

module.exports = router;
