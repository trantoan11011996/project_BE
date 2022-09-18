var express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  getProfileUser,
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



module.exports = router;
