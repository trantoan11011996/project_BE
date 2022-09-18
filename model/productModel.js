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
    imageMain : {type : String, require : true},
    imageDetails: [
      {
        type: String,
        required: true,
      },
    ],
    price : {
      type : Number,
      required : true
    },
    discountPrice : {
      type : Number
    },
    video_link: {
      type: String
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    accessories : [{type : Schema.Types.ObjectId, ref : "Product"}],
    variants:  [{ type: Schema.Types.ObjectId, ref: "Variant" }],
    countInStock : {
      type : Number,
    },
    isTrending : {
      type : Boolean,
    },
    productType : {
      name : String,
    },
  },
  { collection: "products" }
);

const producModel = mongoose.model("Product", productSchema);
module.exports = producModel;
