const productModel = require("../model/productModel");
const categoryModel = require("../model/categoryModel");
const variantModel = require("../model/productVariantModel");
const asyncHandler = require("express-async-handler");
const orderModel = require("../model/orderModel");

// ---------------------------------------------------------- //

const createProduct = asyncHandler(async (req, res) => {
  const category = await categoryModel.findById(req.body.category);

  if (category) {
    const product = await productModel.create(req.body);
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Category is not exist");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product is not exist");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findByIdAndDelete(req.params.id);
  if (product) {
    res.json("Delete success");
  } else {
    res.status(404);
    throw new Error("Delete failed");
  }
});

const createVariant = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.body.product);
  if (product) {
    const variant = await variantModel.create(req.body);
    res.json(variant);
  } else {
    res.status(404);
    res.json("Product is not exist");
  }
});

const updateVariant = asyncHandler(async (req, res) => {
  const variant = await variantModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (variant) {
    res.json(variant);
  } else {
    res.status(404);
    throw new Error("Variant is not exist");
  }
});

const deleteVariant = asyncHandler(async (req, res) => {
  const variant = await variantModel.findByIdAndDelete(req.params.id);
  if (variant) {
    res.json("Delete success");
  } else {
    res.status(404);
    throw new Error("Delete failed");
  }
});

const getAllOrder = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = req.query.pageNumber || 1;

  const order = await orderModel
    .find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ page, order });
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order is not exist");
  }
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  createVariant,
  updateVariant,
  deleteVariant,
  getAllOrder,
  updateOrder,
};
