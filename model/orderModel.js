const mongoose = require("mongoose");
const orderProductModel = require("./orderProductModel");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    createAt: {
      type: Date,
      required: true,
    },
    updateAt: {
      type: Date,
      required: true,
    },
  },
  { collection: "orders" }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;

const body = {
  name: "",
  age: "",
  item: [
    {
      idProduct: "product1",
      qty: "1",
    },
    {
      idProduct: "product2",
      qty: "2",
    },
  ],
};
const order = await orderModel.create(req.body);

let newItems = [];
for (let item of body.item) {
  const orderProduct = new orderProductModel();
  orderProduct.order = order._id;
  orderProduct.product = item.idProduct;
  orderProduct.qty = item.qty;
  await orderProduct.save();
  newItems.push(orderProduct);
}
order.item = newItems;
