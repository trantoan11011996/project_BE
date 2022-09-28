const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const orderModel = require("../model/orderModel");
const asyncHandle = require("express-async-handler");
const orderProductModel = require("../model/orderProductModel");
const userModel = require("../model/userModel");
const mapModel = require("../model/mapModel");

const getAllOrder = asyncHandle(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;
  const status = req.query.status || 0;

  let arr = [];
  let options = {};

  if (status) {
    const arrStatus = status.split(",");
    for (let value of arrStatus) {
      arr.push({ status: value });
    }
    options = { $or: arr };
    console.log("arrStatus", arrStatus);
  }

  console.log("arr", arr);

  const order = await orderModel
    .find(options)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .populate({
      path: "items",
      select: "-_id -order",
      populate: {
        path: "variant",
        select: "discountPrice price productId attributes -_id",
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

  // 2 Calculate shippingPrice by city in mapModel
  const map = await mapModel.findOne({ admin_name: body.shippingAddress.city });
  const firstItem = Number(map.lat);
  const otherItem = Number(map.lng);
  const shippingPrice =
    (body.items.length - (body.items.length - 1)) * firstItem +
    (body.items.length - 1) * otherItem;
  if (body.shippingPrice != shippingPrice)
    throw new Error("Shipping price is not correct");

  // 3 Loop for all items
  for (let item of body.items) {
    const variant = await variantModel.findById(item.variant);
    const orderItem = await orderProductModel.create({
      variant: variant._id,
      quantity: item.qty,
    });

    // 4 push idOrderProduct into clone arr => *6
    idOrderProductModels.push(orderItem._id);

    // 5 calculate price & countInStock
    const priceVariant = variant.discountPrice
      ? variant.discountPrice
      : variant.price;
    subTotalPrice += priceVariant * orderItem.quantity;
    variant.countInStock -= orderItem.quantity;
    await variant.save();

    const product = await productModel
      .findById(variant.productId)
      .populate("variants", "countInStock");
    let cloneProductVariant = [...product.variants];
    for (let value of cloneProductVariant) {
      if (String(value._id) === String(variant._id)) {
        value.countInStock = variant.countInStock;
        const totalCountInStock = cloneProductVariant.reduce((total, cur) => {
          return total + cur.countInStock;
        }, 0);
        product.countInStock = totalCountInStock;
        await product.save();
      }
    }
    cloneOfItemsOrderModel.push(orderItem._id);
  }
  body.items = cloneOfItemsOrderModel;
  body.totalPrice = subTotalPrice + Number(shippingPrice);
  body.user = req.userInfo._id;
  const order = await orderModel.create(body);

  // *6 push order into field order of userSchema
  const user = await userModel.findById(order.user);
  user.order.push(order);
  await user.save();

  // 7 assign idOrder for field order of orderProductSchema
  for (let id of idOrderProductModels) {
    const orderItem = await orderProductModel.findById(id);
    orderItem.order = order._id;
    await orderItem.save();
  }
  res.json(order);
});

const deleteOrder = asyncHandle(async (req, res) => {
  const user = await userModel.findById(req.userInfo._id);
  const order = await orderModel.findById(req.params.id);

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
      const product = await productModel
        .findById(variant.productId)
        .populate("variants", "countInStock");
      let cloneProductVariant = [...product.variants];
      for (let value of cloneProductVariant) {
        if (String(value._id) === String(variant._id)) {
          value.countInStock = variant.countInStock;
          cloneProductVariant = cloneProductVariant.reduce((total, cur) => {
            return total + cur.countInStock;
          }, 0);
          product.countInStock = cloneProductVariant;
          await product.save();
        }
      }
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
const getDetailOrder = asyncHandle(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "-order -password -_id -isAdmin")
    .populate(
      "productId",
      "-desc -imageMain -imageDetails -price -category -variants -countInStock -isTrending -productType -accessories -_id"
    );
  res.json(order);
});

module.exports = {
  getAllOrder,
  updateOrder,
  createOrder,
  deleteOrder,
  getDetailOrder,
};
