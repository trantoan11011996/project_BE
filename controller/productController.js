const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const asyncHandler = require("express-async-handler");

const createProduct = async (req, res) => {
  const product = await productModel.create(req.body);
  await product.save();
  res.json({
    product,
  });
};

const getProduct = asyncHandler(async (req, res) => {
  const product = "";
});
const getAllProduct = async (req, res) => {
  const allProduct = await productModel
    .find()
    .populate("category", "-_id")
    .populate("option");
  res.json(allProduct);
};

const getProductById = asyncHandler(async (req, res) => {});
const getProductByCategory = asyncHandler(async (req, res) => {});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  getProductById,
  getProductByCategory,
};
