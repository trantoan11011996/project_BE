const mongoose = require("mongoose");
const { Schema } = mongoose;
const variantSchema = mongoose.Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Products" },
  name: {
    type: String,
  },
  option: [
    {
      name: {
        type: String,
      },
      pirce: {
        type: Number,
        require: true,
      },
      priceDiscount: {
        type: Number,
      },
      image: {
        type: String,
        require: true,
      },
    },
  ],
});

const Variants = mongoose.model("Variants", variantSchema);
module.exports = Variants;
