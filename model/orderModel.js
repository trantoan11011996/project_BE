const mongoose = require("mongoose");
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
    shippingPrice: { type: Number, required: true },
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
