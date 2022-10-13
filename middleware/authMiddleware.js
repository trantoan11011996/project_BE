const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userVerify = jwt.verify(token, "masobimat");
      const userInfo = await userModel
        .findById(userVerify.id)
        .select("-password");
      req.userInfo = userInfo;
      next();
    } catch (err) {
      res.status(400);
      throw new Error(err);
    }
  } else {
    res.status(400);
    throw new Error("You have to login");
  }
});

const checkAdmin = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.userInfo._id);
  if (user && user.isAdmin == true) {
    next();
  } else {
    res.status(401);
    throw new Error("You dont have permisson to access");
  }
});
module.exports = {
  protect,
  checkAdmin,
};
