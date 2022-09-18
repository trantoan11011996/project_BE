const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const orderModel = require("../model/orderModel");
const asyncHandle = require("express-async-handler");
const orderProductModel = require("../model/orderProductModel");

const getAllOrder = asyncHandle(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;

  const order = await orderModel
    .find()
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .populate({
      path: "items",
      populate: {
        path: "variant",
        select: "discountPrice",
        // populate: { path: "" },
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
  //body={
  //     user:'',
  //     status:'',
  //     item:[{
  //         variant:"",
  //         qty:""
  //     }]
  // }
  const body = { ...req.body };
  let subTotalPrice = 0;
  const cloneOfItemsOrderModel = [];

  //   for (let item of body.items) {
  //     const variant = await variantModel.findById(item.product);
  //     const priceVariant = variant.discountPrice
  //       ? variant.discountPrice
  //       : variant.price;
  //     subTotalPrice += Number(priceVariant) * Number(item.quantity);

  //     variant.countInStock -= item.quantity;
  //     await variant.save();
  //     console.log("priceVariant", priceVariant);
  //     console.log("countInStock", variant.countInStock);
  //   }
  //   body.totalPrice = subTotalPrice + body.shippingPrice;
  //   const order = await await orderModel.create(body);

  for (let item of body.items) {
    const variant = await variantModel.findById(item.variant);
    const orderItem = await orderProductModel.create({
      variant: variant._id,
      quantity: item.qty,
    });
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

  orderItem.order = order._id;
  await orderItem.save();
  // add order trong userSchema
  res.json(order);
});

module.exports = {
  getAllOrder,
  updateOrder,
  createOrder,
};
