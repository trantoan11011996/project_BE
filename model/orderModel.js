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
      // {
      //   variant: { type: Schema.Types.ObjectId, ref: "Variant" },
      //   quantity: { type: Number, required: true },
      // },
      {
        type: Schema.Types.ObjectId,
        ref: "OrderProduct",
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      city: { type: String, required: true },
    },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createAt: {
      type: String,
      required: true,
      default: Date(),
    },
    updateAt: {
      type: String,
      required: true,
      default: Date(),
    },
  },
  { collection: "orders" }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
