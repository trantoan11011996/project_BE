const mongoose = require("mongoose");
const { Schema } = mongoose;
const variantSchema = mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
    },
    attributes: [],
  },
  { collection: "variants" }
);

const variantModel = mongoose.model("Variant", variantSchema);
module.exports = variantModel;
