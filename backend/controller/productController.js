const PRODUCT = require("../model/productModel");
const USER = require("../model/userModel");
const mongoose = require("mongoose");

const createProduct = async (req, res) => {
  const { name, image, quantity, price } = req.body;

  const Product = new PRODUCT({
    name,
    image,
    quantity,
    price,
    inStock: quantity > 0 ? true : false,
  });
  try {
    const newProduct = await PRODUCT.create(Product);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const Products = await PRODUCT.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: Products,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Products not found",
      error: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }
  try {
    const Product = await PRODUCT.findById(id);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: Product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }
  try {
    const updatedProduct = await PRODUCT.findByIdAndUpdate(
      id,
      {
        _id: id,
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { ProductUserId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(ProductUserId)
  ) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }
  try {
    const user = await USER.findById(req.user.id).select("shoppingCart");
    
    const isAlreadyInCart = user.shoppingCart.find((item) => item === id);
    if (isAlreadyInCart) {
      return res.status(400).json({
        success: false,
        message: "Unable to add to cart",
        error: "Product already in cart",
      });
    } else {
      user.shoppingCart.push(id);
      user.save();

      res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        data: user.shoppingCart,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
};
const removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }
  try {
  
    const user = await USER.findById(req.user.id).select("shoppingCart");
    const isInCart = user.shoppingCart.find((item) => item === id);
    if (!isInCart) {
      return res.status(400).json({
        success: false,
        message: "Unable to remove from cart",
        error: "Product not in cart",
      });
    } else {
      user.shoppingCart = user.shoppingCart.filter((item) => item !== id);
      user.save();

      res.status(200).json({
        success: true,
        message: "Product removed from cart successfully",
        data: user.shoppingCart,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }
  try {
    const deletedProduct = await PRODUCT.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  addProductToCart,
  removeProductFromCart,
  deleteProduct,
};
