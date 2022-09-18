const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const orderModel = require("../model/orderModel");
const asyncHandle = require("express-async-handler");

const getAllOrder = asyncHandle(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;

  const order = await orderModel
    .find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({ order, page });
});

const updateOrder = asyncHandle(async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order is not exist");
  }
});

const createOrder = asyncHandle(async (req, res) => {
  const body = { ...req.body };
  const order = await orderModel.create(body);

  for (let item of order.items) {
    const variant = await variantModel.findById(item.product);
  }
});

module.exports = {
  getAllOrder,
  updateOrder,
};
