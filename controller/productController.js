const productModel = require("../model/productModel");
const variantModel = require("../model/productVariantModel");
const categoryModel = require("../model/categoryModel");
const asyncHandler = require("express-async-handler");
const { find } = require("../model/productModel");

const getAllCategory = asyncHandler(async (req, res) => {
  const allCategory = await categoryModel.find();
  res.json(allCategory);
});
const getProductDetail = asyncHandler(async (req, res) => {
  const product = await productModel
    .findById(req.params.id)
    .select("-imageMain")
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
  // lọc trùng
  arrAtributes = arrAtributes.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.name === value.name && t.value === value.value)
  );
  const result = Array.from(new Set(arrAtributes.map((s) => s.name))).map(
    (lab) => {
      return {
        name: lab,
        value: arrAtributes
          .filter((s) => s.name === lab)
          .map((edition) => edition.value),
      };
    }
  );

  if (product) {
    // const variantProduct = product.variants
    console.log("attributes", arrAtributes);
    console.log("variant", variants[0]);
    res.json({ product, result });
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
    console.log(arr);
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
    .select("-desc -imageDetails -variants")
    .populate("category", "name");
  const allCategory = await categoryModel.find();
  res.json({ allProduct, allCategory });
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await productModel.create(req.body);
  res.json(product);
});

const createVariants = asyncHandler(async (req, res) => {
  const id_product = req.body.productId;

  try {
    const product = await productModel
      .findById(id_product)
      .populate("variants", "countInStock price discountPrice");
    console.log("product", product);
    if (product) {
      const variant = await variantModel.create(req.body);

      product.variants.push(variant);
      await product.save();

      const cloneVariants = [...product.variants];
      const totalCountInStock = cloneVariants.reduce((total, value) => {
        return total + value.countInStock;
      }, 0);

      product.countInStock = totalCountInStock;
      const arrPrice = [];
      cloneVariants.forEach((item) => {
        if (item.discountPrice) {
          arrPrice.push(item.discountPrice);
        } else {
          arrPrice.push(item.price);
        }
      });
      console.log(arrPrice);
      const minPrice = Math.min(...arrPrice);
      product.price = minPrice;
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
  res.json(category);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
});

const getVariant = asyncHandler(async (req, res) => {
  const variant = await variantModel.findById(req.params.id);
  res.json(variant);
});

const updateVariant = asyncHandler(async (req, res) => {
  const idProduct = req.params.id;

  let product = await productModel.findById(idProduct).populate("variants");
  if (product) {
    const variant = await variantModel.findByIdAndUpdate(
      req.body.idVariant,
      req.body,
      { new: true }
    );
    product = await productModel.findById(idProduct).populate("variants");
    const cloneVariants = [...product.variants];
    const totalCountInStock = cloneVariants.reduce((total, value) => {
      return total + value.countInStock;
    }, 0);

    product.countInStock = totalCountInStock;
    bn;
    await product.save();
    res.json({ product, variant });
  } else {
    res.status(404);
    throw new Error("Product not exist");
  }
  /////
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    const allVariant = await variantModel.deleteMany({
      productId: product._id,
    });
    await product.remove();
    res.json({
      message: "delete success",
    });
  } else {
    res.status(404);
    throw new Error(`can't delete because product can't found`);
  }
});

const deleteVariant = asyncHandler(async (req, res) => {
  const variant = await variantModel.findById(req.params.id);
  if (variant) {
    const product = await productModel
      .findById(variant.productId)
      .populate("variants", "countInStock price discountPrice");
    let cloneVariant = [...product.variants];
    cloneVariant = cloneVariant.filter((item) => {
      return String(item._id) != String(variant._id);
    });
    const arrPrice = [];
    cloneVariant.forEach((item) => {
      if (item.discountPrice) {
        arrPrice.push(item.discountPrice);
      } else {
        arrPrice.push(item.price);
      }
    });
    const minPrice = Math.min(...arrPrice);
    product.price = minPrice;
    const totalCountInStock = cloneVariant.reduce((total, item) => {
      return total + item.countInStock;
    }, 0);
    console.log("total", totalCountInStock);
    product.countInStock = totalCountInStock;
    product.variants = cloneVariant;
    await product.save();
    await variant.remove();
    res.json({
      message: "delete success",
    });
  } else {
    res.status(404);
    throw new Error("variant can not found");
  }
});
module.exports = {
  getProductDetail,
  getAllProduct,
  getProductByCategory,
  createProduct,
  createCategory,
  getAllCategory,
  createVariants,
  deleteProduct,
  updateProduct,
  updateVariant,
  deleteVariant,
  getVariant,
  getAllCategory,
};
