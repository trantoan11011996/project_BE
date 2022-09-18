const userModel = require("../model/userModel");
const orderModel = require("../model/orderModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../unitls/generateToken");
const bcrypt = require("bcryptjs")

// create User

const creatUser = asyncHandler(async (req, res) => {
  const { body } = req;
  const userExist = await userModel.findOne({email : body.email});
  if (userExist) {
    res.status(400);
    res.json({
      message: "user have been exist",
    });
  }
  const newUser = await userModel.create(req.body);
  if (newUser) {
    res.status(200);
    res.json({
      newUser,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(200);
    throw new Error("ivalid register user");
  }
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      name: user.name,
      email: user.email,
      order: user.order,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    res.json({
      message: "password or email incorrect",
    });
  }
});

const getProfileUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userInfo._id);
  if (user) {
    res.status(200);
    res.json(user);
  } else {
    res.status(400);
    throw new Error("user can not found");
  }
});
//update user

const updateUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userInfo._id);

  if (user) {
    user.address = req.body.address || user.address;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const update = await user.save();
    res.json({
      _id: update._id,
      password: update.password,
    });
  } else {
    res.status(400);
    res.json({
      message: "user not found",
    });
  }
});

// get user by id
const getUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOne(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

//get all user
const getAllUser = asyncHandler(async (req, res) => {
  const user = await userModel.find();
  if (user) {
    res.json(user);
  } else {
    res.json({
      message: `lỗi`,
    });
  }
});

// delete
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({
      message: "xóa thành công",
    });
  } else {
    res.status(200);
    res.json({
      message: "lỗi",
    });
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
  creatUser,
  loginUser,
  getProfileUser,
  updateUser,
  getUser,
  getAllUser,
  deleteUser,
};
