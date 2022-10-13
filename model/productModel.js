const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    desc: {
      titleDesc: { type: String },
      option: [
        {
          titleOption: {
            type: String,
          },
          listOption: [],
        },
      ],
      video_link: { type: String },
    },
    imageMain: { type: String, require: true },
    imageDetails: [
      {
        type: String,
        required: true,
      },
    ],
    price: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    accessories: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    variants: [{ type: Schema.Types.ObjectId, ref: "Variant" }],
    countInStock: { type: Number },
    isTrending: { type: Boolean },
    productType: { name: String },
  },
  { collection: "products" }
);

const producModel = mongoose.model("Product", productSchema);
module.exports = producModel;
