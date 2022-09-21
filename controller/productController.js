const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const asyncHandler = require("express-async-handler");

const getProductDetail = asyncHandler(async (req, res) => {
  const product = await productModel
    .findById(req.params.id)
    .populate("variants")
    .populate("category");
  const variants = product.variants;
  let arrAtributes = [];
  for (let i = 0; i < variants.length; i++) {
    const attributes = variants[i].attributes;
    for (let j = 0; j < attributes.length; j++) {
      arrAtributes.push(attributes[j]);
    }
  }
  arrAtributes = arrAtributes.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.name === value.name && t.value === value.value)
  );
  var seen = {};
  arrAtributes = arrAtributes.filter(function (item) {
    var previous;

    // 
    if (seen.hasOwnProperty(item.name)) {
      console.log(seen);
      // Yes, grab it and add this value to it
      previous = seen[item.name];
      previous.value.push(item.value);

      // Don't keep this item, we've merged it into the previous one
      return false;
    }

    // item.value probably isn't an array; make it one for consistency
    if (!Array.isArray(item.value)) {
      item.value = [item.value];
    }

    // Remember that we've seen it
    seen[item.name] = item;

    // Keep this one, we'll merge any others that match into it
    return true;
  });
  if (product) {
    res.json({ product, arrAtributes });
  } else {
    res.status(404);
    throw new Error("product cant not found");
  }
});

const getProductByCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  if (category) {
    const product = await productModel.find({ category: category._id });
    res.json(product);
  } else {
    res.status(404);
    res.json({
      message: "product can not found",
    });
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  const fieldSort = req.query.fieldSort ? req.query.fieldSort : "";
  const typeSort = req.query.typeSort ? req.query.typeSort : "";
  const pageSize = 16;
  const page = req.query.pageNumber || 1;
  const search = req.query.search || "";
  const countInStock = req.query.countInStock || 0;
  const priceFrom = req.query.priceFrom || 0;
  const priceTo = req.query.priceTo || 0;

  let arr = [];
  if (search) {
    arr.push({ name: { $regex: search } });
  }
  if (countInStock == 1) {
    arr.push({ countInStock: { $gt: 0 } });
  }
  if (countInStock == 2) {
    arr.push({ countInStock: { $eq: 0 } });
  }
  if (priceFrom) {
    arr.push({ price: { $gte: priceFrom } });
  }
  if (priceTo) {
    arr.push({ price: { $lte: priceTo } });
  }

  //sort
  let a = "";
  if (fieldSort) {
    if (typeSort == "asc") {
      a = fieldSort;
    } else {
      a = "-" + fieldSort;
    }
  }

  let options;
  if (arr.length == 0) {
    options = {};
  } else {
    options = { $and: arr };
  }

  const allProduct = await productModel
    .find(options)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(`${a}`)
    .populate("category", "name");
  const allCategory = await categoryModel.find();
  res.json({ allProduct, allCategory });
});

const createProduct = asyncHandler(async (req, res) => {
  const getAllCategory = await categoryModel.find();
  const product = await productModel.create(req.body);
  res.json({ getAllCategory, product });
});

const createVariants = asyncHandler(async (req, res) => {
  const id_product = req.body.productId;

  try {
    const product = await productModel
      .findById(id_product)
      .populate("variants", "countInStock");
    console.log("product", product);
    if (product) {
      const variant = await variantModel.create(req.body);
      await variant.save();
      product.variants.push(variant);
      await product.save();
      const cloneVariants = [...product.variants];
      const totalCountInStock = cloneVariants.reduce((total, value) => {
        return total + value.countInStock;
      }, 0);
      product.countInStock = totalCountInStock;
      await product.save();
      res.json(product);
    } else {
      res.status(404);
      throw new Error("loi");
    }
  } catch (err) {
    throw new Error(err);
  }
});
const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryModel.create(req.body);
  await category.save();
  res.json(category);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params._id);
  if (product) {
    await product.save();
    const accessories = await productModel.findById(req.body.accessories);
    if (accessories) {
      product.accessories.push(accessories);
      await product.save();
      res.json(product);
    }
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await productModel.findByIdAndRemove(req.params._id)
    res.json({
        message : "xóa thành công"
    })
})


const getVariant = asyncHandler(async(req,res)=>{
    const variant = await variantModel.findById(req.params.id)
    res.json(variant)
})
module.exports = {
  getProductDetail,
  getAllProduct,
  getProductByCategory,
  createProduct,
  createCategory,
  createVariants,
  deleteProduct,
  updateProduct,
  updateVariant,
  deleteVariant,
  getVariant
};
