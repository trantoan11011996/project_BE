const mongoose = require("mongoose");
const { Schema } = mongoose;
const variantSchema = mongoose.Schema([
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name : {
      type : String,
    },
    image : {
      type : String
    },
    price : {
      type : Number
    },
    countInStock : {
      type : Number
    },
  }],
  { collection: "variants" }
);

const variantModel = mongoose.model("Variant", variantSchema);
module.exports = variantModel;
