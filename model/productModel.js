const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: [
      {
        type: String,
        required: true,
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    option: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
  },
  { collection: "products" }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
