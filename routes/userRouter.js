var express = require("express");
const { createOrder } = require("../controller/orderController");
const {
  createUser,
  loginUser,
  updateUser,
  getProfileUser,
  payViaPayPalGateWay,
  getSuccessForPaypal,
  getCancelForPaypal,forgotPassword
} = require("../controller/userController");
const { protect, checkAdmin } = require("../middleware/authMiddleware");
var router = express.Router();

// 1.
// desc : register new user
// route : POST /api/users/register
// access : public
router.post("/", createUser);

// 2.
// desc : user login to system
// route : POST /api/users/login
// access : public - return token
router.post("/login", loginUser);

// 3.
// desc : get profile user
// route : GET /api/users/profile
// access : private - use token - return order
router.get("/profile", protect, getProfileUser);

// 4.
// desc : update user
// route : PUT /api/users/profile
// access : user
router.put("/profile", protect, updateUser);

// 5.
// desc : pay for order
// router POST /api/users/paypalgateway
// access : user
router.post("/paypalgateway",protect, payViaPayPalGateWay);

// 6.
// desc : noti success for paypal
// router GET /api/users/success
// access : user
router.get("/success", protect, getSuccessForPaypal);

// 7.
// desc : noti fail for paypal
// router GET /api/users/fail
// access : user
router.get("/cancel", protect, getCancelForPaypal);

// 8.
// desc : forgot password
// router POST /api/users/forgotpassword
// access : public
router.post("/forgotpassword", forgotPassword);

////// 12
// desc : create order
// route : POST /api/user/order
// access : token
router.post("/order", protect, createOrder);
module.exports = router;
