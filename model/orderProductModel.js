const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderProductSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    variant: { type: Schema.Types.ObjectId, ref: "Variant" },
    quantity: { type: Number, required: true },
  },
  { collection: "orderProducts" }
);

const orderProductModel = mongoose.model("OrderProduct", orderProductSchema);
module.exports = orderProductModel;
