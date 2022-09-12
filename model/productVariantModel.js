const mongoose = require("mongoose");
const { Schema } = mongoose;
const variantSchema = mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    titleOption: {
      type: String,
    },
    option: [
      {
        name: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        priceDiscount: {
          type: Number,
        },
        image: {
          type: String,
          required: true,
        },
        countInStock: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { collection: "variants" }
);

const variantModel = mongoose.model("Variant", variantSchema);
module.exports = variantModel;
