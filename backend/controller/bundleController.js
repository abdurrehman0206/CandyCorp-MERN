// bundleController.js
const BUNDLE = require("../model/bundleModel");
const mongoose = require("mongoose");

const createBundle = async (req, res) => {
  const { name, description, products, price, onSale, salePercentage } =
    req.body;

  const bundle = new BUNDLE({
    name,
    description,
    products,
    price,
    onSale,
    salePercentage,
  });

  try {
    const newBundle = await BUNDLE.create(bundle);
    res.status(201).json({
      success: true,
      message: "Bundle created successfully",
      data: newBundle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Bundle creation failed",
      error: error.message,
    });
  }
};

const getBundles = async (req, res) => {
  try {
    const bundles = await BUNDLE.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Bundles fetched successfully",
      data: bundles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getBundle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Bundle not found",
      error: "Invalid Id",
    });
  }

  try {
    const bundle = await BUNDLE.findById(id);
    if (!bundle) {
      return res.status(404).json({
        success: false,
        message: "Bundle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bundle fetched successfully",
      data: bundle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateBundle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Bundle not found",
      error: "Invalid Id",
    });
  }

  try {
    const updatedBundle = await BUNDLE.findByIdAndUpdate(
      id,
      {
        _id: id,
        ...req.body,
      },
      { new: true }
    );

    if (!updatedBundle) {
      return res.status(400).json({
        success: false,
        message: "Bundle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bundle updated successfully",
      data: updatedBundle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteBundle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Bundle not found",
      error: "Invalid Id",
    });
  }

  try {
    const deletedBundle = await BUNDLE.findByIdAndRemove(id);

    res.status(200).json({
      success: true,
      message: "Bundle deleted successfully",
      data: deletedBundle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const addProductToBundle = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(404).json({
      success: false,
      message: "Bundle or Product not found",
      error: "Invalid Id",
    });
  }

  try {
    const bundle = await BUNDLE.findById(id);

    if (!bundle) {
      return res.status(404).json({
        success: false,
        message: "Bundle not found",
      });
    }

    const productIndex = bundle.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex !== -1) {
      // If the product is already in the bundle, update the quantity
      bundle.products[productIndex].quantity += quantity || 1;
    } else {
      // If the product is not in the bundle, add it
      bundle.products.push({
        product: productId,
        quantity: quantity || 1,
      });
    }

    await bundle.save();

    res.status(200).json({
      success: true,
      message: "Product added to the bundle successfully",
      data: bundle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const removeProductFromBundle = async (req, res) => {
  const { id, productId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(404).json({
      success: false,
      message: "Bundle or Product not found",
      error: "Invalid Id",
    });
  }

  try {
    const bundle = await BUNDLE.findById(id);

    if (!bundle) {
      return res.status(404).json({
        success: false,
        message: "Bundle not found",
      });
    }

    bundle.products = bundle.products.filter(
      (item) => item.product.toString() !== productId
    );

    await bundle.save();

    res.status(200).json({
      success: true,
      message: "Product removed from the bundle successfully",
      data: bundle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createBundle,
  getBundles,
  getBundle,
  updateBundle,
  deleteBundle,
  addProductToBundle,
  removeProductFromBundle,
};
