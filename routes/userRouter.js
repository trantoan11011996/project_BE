var express = require("express");
var router = express.Router();
const { createOrder, deleteOrder } = require("../controller/orderController");
const {
  createUser,
  loginUser,
  updateUser,
  getProfileUser,
  payViaPayPalGateWay,
  getSuccessForPaypal,
  getCancelForPaypal,
  forgotPassword,
} = require("../controller/userController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// 1.
// desc : register new user
// route : POST /api/users/register
// access : public
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: duycuong
 *               email:
 *                 type: email
 *                 example: duycuong@gmail.com
 *               password:
 *                 type: string
 *                 example: duycuong
 *     responses:
 *       200:
 *         description: You can login with this account, it have full authorization. duycuong1@gmai.com duycuong1
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: string
 *                 name:
 *                   type: string
 *                   example: string
 *                 token:
 *                   type: string
 *                   example: string
 *       400:
 *         description: Register failed
 */
router.post("/", createUser);

// 2.
// desc : user login to system
// route : POST /api/users/login
// access : public - return token
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     requestBody:
 *       description: This account is Admin, it have full authority
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: email
 *                 example: duycuong1@gmail.com
 *               password:
 *                 type: string
 *                 example: duycuong1
 *     responses:
 *       200:
 *         description: Login success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: string
 *                 name:
 *                   type: string
 *                   example: string
 *                 order:
 *                   type: array
 *                   example: [string]
 *                 token:
 *                   type: string
 *                   example: string
 *       400:
 *         description: User or password is not correct
 */
router.post("/login", loginUser);

// 3.
// desc : get profile user
// route : GET /api/users/profile
// access : private - use token - return order
/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get profile user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: get profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: string
 *                 name:
 *                   type: string
 *                   example: string
 *                 order:
 *                   type: array
 *                   example: [string]
 *       400:
 *         description : You have to login
 */
router.get("/profile", protect, getProfileUser);

// 4.
// desc : update user
// route : PUT /api/users/profile
// access : user
/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user
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
 *                 example: newName
 *               password:
 *                 type: string
 *                 example: newPassword
 *     responses:
 *       200:
 *         description: Update success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: string
 *       400:
 *         description: User not found
 *
 */
router.put("/profile", protect, updateUser);

// 5.
// desc : pay for order
// router POST /api/users/paypalgateway
// access : private - login
/**
 * @swagger
 * /api/users/paypalgateway:
 *   post:
 *     summary: Pay via Paypal gateway
 *     security:
 *       - bearerAuth: []
 *     description: You can access this url -- https://keyboardshop.herokuapp.com/testpaypal
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: email
 *                 example: user4PayPal@gmail.com
 *               password:
 *                 type: string
 *                 example: paypal123
 */
router.post("/paypalgateway", payViaPayPalGateWay);

/**
 * @swagger
 *   post:
 *     summary: Login with facebook
 *     description: You can access this url -- https://keyboardshop.herokuapp.com
 */

// 6.
// desc : noti success for paypal
// router GET /api/users/success
// access : private - login
router.get("/success", getSuccessForPaypal);

// 7.
// desc : noti fail for paypal
// router GET /api/users/fail
// access : private - login
router.get("/cancel", getCancelForPaypal);

// 8.
// desc : forgot password
// router POST /api/users/forgotpassword
// access : public
/**
 * @swagger
 * /api/users/forgotpassword:
 *   post:
 *     summary: Recover password
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: email
 *                 example: Your real email
 *     responses:
 *       200:
 *         description: Success, check your email
 *       400:
 *         description: Your email is not exist
 */
router.post("/forgotpassword", forgotPassword);

// 9.
// desc : create order
// route : POST /api/users/order
// access : private - login
/**
 * @swagger
 * /api/users/order:
 *   post:
 *     summary: Create order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     variant:
 *                       type: string
 *                       example: 6329f38c8aedc793ed5e3423
 *                     qty:
 *                       type: integer
 *                       example: 2
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   district:
 *                     type: string
 *                   city:
 *                     type: string
 *                     example: Hà Nội
 *               shippingPrice:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Error
 */
router.post("/order", protect, createOrder);

// 10
// desc : delete order
// route : DEL /api/users/order/:id
// access : private - login
/**
 * @swagger
 * /api/users/order/{id}:
 *   delete:
 *     summary: Delete order
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
 *         description: Fail
 */
router.delete("/order/:id", protect, deleteOrder);

module.exports = router;
