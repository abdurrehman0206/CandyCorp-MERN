const PRODUCT = require("../model/productModel");
const mongoose = require("mongoose");

const likeProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const product = await PRODUCT.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const likedIndex = product.likes.indexOf(userId);

    if (likedIndex === -1) {
      product.likes.push(userId);
    } else {
      product.likes.splice(likedIndex, 1);
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product liked/unliked successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error liking/unliking product",
      error: error.message,
    });
  }
};
const createProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    quantity,
    images,
    onSale,
    salePercentage,
    type,
    category,
    flavor,
    size,
  } = req.body;

  const inStock = quantity > 0;

  const product = new PRODUCT({
    name,
    description,
    price,
    quantity,
    inStock,
    images,
    onSale,
    salePercentage,
    type,
    category,
    flavor,
    size,
  });

  try {
    const newProduct = await PRODUCT.create(product);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await PRODUCT.find().sort({ createdAt: -1 }).populate({
      path: "reviews.user",
      select: "fullname username image -_id",
    });
    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
    const Product = await PRODUCT.findById(id).populate({
      path: "reviews.user",
      select: "fullname username image -_id",
    });
    if (!Product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: Product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
    if (!updateProduct) {
      return res.status(400).json({
        success: false,
        message: "Products not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const addUserReview = async (req, res) => {
  const { id } = req.params;
  const { title, rating, comment } = req.body;
  const userId = req.user.id;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }

  try {
    const product = await PRODUCT.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = {
      user: userId,
      title,
      rating,
      comment,
    };

    product.reviews.push(review);
    await product.save();

    await product.populate("reviews.user", "fullname username image -_id");

    res.status(200).json({
      success: true,
      message: "User review and rating added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateUserReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const { userId, rating, comment } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
      error: "Invalid Id",
    });
  }

  try {
    const product = await PRODUCT.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.user = userId;
    review.rating = rating;
    review.comment = comment;

    await product.save();

    res.status(200).json({
      success: true,
      message: "User review and rating updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const applyGlobalDiscount = async (req, res) => {
  const { discountPercentage } = req.body;

  try {
    if (discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({
        success: false,
        message: "Invalid discount percentage",
      });
    }

    const products = await PRODUCT.find();

    products.forEach(async (product) => {
      product.onSale = discountPercentage > 0;
      product.salePercentage = discountPercentage;

      await product.save();
    });

    res.status(200).json({
      success: true,
      message: `Global discount of ${discountPercentage}% applied successfully`,
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
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addUserReview,
  updateUserReview,
  applyGlobalDiscount,
  likeProduct,
};
