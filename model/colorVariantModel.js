const mongoose = require("mongoose");
const { Schema } = mongoose;
const colorSchema = mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    name : {
      type : String,
    },
    image : {
      type : String
    },
  },
  { collection: "colors" }
);

const colorModel = mongoose.model("Color", colorSchema);
module.exports = colorModel;
