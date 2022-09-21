const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const orderModel = require("../model/orderModel");
const asyncHandle = require("express-async-handler");
const orderProductModel = require("../model/orderProductModel");
const userModel = require("../model/userModel");

const getAllOrder = asyncHandle(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;
  const status = req.query.status || 0;
  let arr = {};
  if (status == "pending") {
    arr = { status: "pending" };
  }
  if (status == "shipping") {
    arr = { status: "shipping" };
  }
  if (status == "finished") {
    arr = { status: "finished" };
  }
  if (status == "cancel") {
    arr = { status: "cancel" };
  }
  
  const order = await orderModel
    .find(arr)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .populate({
      path: "items",
      select: "-_id -order",
      populate: {
        path: "variant",
        select: "discountPrice price productId -_id",
        populate: { path: "productId", select: "name -_id" },
      },
    });

  res.json({ order, page });
});

const updateOrder = asyncHandle(async (req, res) => {
  const order = await orderModel.findById(req.params.id);
  if (order) {
    order.status = req.body.status || order.status;
    order.updateAt = Date();
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order is not exist");
  }
});

const createOrder = asyncHandle(async (req, res) => {
  const body = { ...req.body };
  const cloneOfItemsOrderModel = [];
  const idOrderProductModels = [];
  let subTotalPrice = 0;

  // Check all qty item in order with countInStock of Variant
  for (let item of body.items) {
    const variant = await variantModel.findById(item.variant);
    if (item.qty > variant.countInStock) {
      res.status(404);
      throw new Error("Số lượng hàng tồn kho k đủ");
    }
  }

  for (let item of body.items) {
    const variant = await variantModel.findById(item.variant);
    const orderItem = await orderProductModel.create({
      variant: variant._id,
      quantity: item.qty,
    });
    //
    idOrderProductModels.push(orderItem._id);
    //
    const priceVariant = variant.discountPrice
      ? variant.discountPrice
      : variant.price;
    subTotalPrice += priceVariant * orderItem.quantity;
    variant.countInStock -= orderItem.quantity;
    await variant.save();

    cloneOfItemsOrderModel.push(orderItem._id);
  }

  body.items = cloneOfItemsOrderModel;
  body.totalPrice = subTotalPrice + Number(body.shippingPrice);
  const order = await orderModel.create(body);

  // push order into field order of userSchema
  const user = await userModel.findById(order.user);
  user.order.push(order);
  await user.save();

  // assign idOrder for field order of orderProductSchema
  for (let id of idOrderProductModels) {
    const orderItem = await orderProductModel.findById(id);
    orderItem.order = order._id;
    await orderItem.save();
  }
  res.json(order);
});

const deleteOrder = asyncHandle(async (req, res) => {
  const user = await userModel.findById(req.params.id);
  const order = await orderModel.findById(req.body.idOrder);

  if (order) {
    //update field order in userSchema
    // chú ý ép kiểu khi so sánh : item == order._id => FALSE
    let cloneOrder = [...user.order];
    cloneOrder = cloneOrder.filter((item) => String(item) != String(order._id));
    user.order = cloneOrder;
    await user.save();

    // update field countInStock in variantSchema
    const cloneItems = [...order.items];
    for (let item of cloneItems) {
      const orderItem = await orderProductModel.findById(item);
      const variant = await variantModel.findById(orderItem.variant);
      variant.countInStock += orderItem.quantity;
      await variant.save();
    }

    // delete orderProductSchema
    await orderProductModel.deleteMany({ order: order._id });

    await order.remove();
    res.json("Delete success");
  } else {
    res.status(404);
    throw new Error("Order is not exist");
  }
});

module.exports = {
  getAllOrder,
  updateOrder,
  createOrder,
  deleteOrder,
};
