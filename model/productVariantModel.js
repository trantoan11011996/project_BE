const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const variantSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    image: { type: String },
    price: { type: Number },
    discountPrice: { type: Number },
    countInStock: { type: Number },
    attributes: [],
  },
  { collection: "variants" }
);

const variantModel = mongoose.model("Variant", variantSchema);
module.exports = variantModel;
