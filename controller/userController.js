const userModel = require("../model/userModel");
const orderModel = require("../model/orderModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../unitls/generateToken");
const bcrypt = require("bcryptjs");

// create User

const createUser = asyncHandler(async (req, res) => {
  const { body } = req;
  const userExist = await userModel.findOne({ email: body.email });
  if (userExist) {
    res.status(404);
    res.json({
      message: "user have been exist",
    });
  }
  const newUser = await userModel.create(req.body);
  res.json({
    email: newUser.email,
    name: newUser.name,
    token: generateToken(newUser._id),
  });
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      name: user.name,
      email: user.email,
      order: user.order,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("email or password incorrect");
  }
});

const getProfileUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userInfo._id);
  res.json({
    email: user.email,
    name: user.name,
    order: user.order,
  });
});
//update user

const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userInfo._id);

  if (user) {
    user.email = req.body.email || user.mail;
    user.password = req.body.password || user.password;
    user.name = req.body.name || user.name;
    const update = await user.save();
    res.json({
      email: update.email,
      name: update.email,
      message: "update thành công",
    });
  } else {
    res.status(404);
    res.json({
      message: "user not found",
    });
  }
});

// get user by id
const getUser = asyncHandler(async (req, res) => {
  const user = await userModel
    .findById(req.params.id)
    .select("-password")
    .populate({
      path: "order",
      populate: {
        path: "items",
        populate: { path: "variant", select: "discountPrice" },
      },
    });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

//get all user
const getAllUser = asyncHandler(async (req, res) => {
  const pageSize = 16;
  const page = req.query.pageNumber || 1;
  const user = await userModel
    .find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// delete
const deleteUser = asyncHandler(async (req, res) => {
  ///liên quan đến  order 
  const user = await userModel.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: "xóa thành công",
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const idUser = req.params.id;
  const body = { ...req.body };

  const user = await userModel.findById(idUser);
  if (user) {
    const order = new orderModel();
    order.user = idUser;
    order.shippingAddress = body.shippingAddress;
  } else {
    res.status(404);
    throw new Error("User is not exist");
  }
});

module.exports = {
  createUser,
  loginUser,
  getProfileUser,
  updateUser,
  getUser,
  getAllUser,
  deleteUser,
};
