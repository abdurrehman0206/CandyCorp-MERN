const ORDER = require("../model/orderModel");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const { id } = req.user;
  const { products, totalAmount, status } = req.body;

  const order = new ORDER({
    user: id,
    products,
    totalAmount,
    status,
  });

  try {
    const newOrder = await ORDER.create(order);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await ORDER.find()
      .populate("user")
      .populate("products")
      .sort({ orderDate: -1 });
    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "Orders not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await ORDER.find({ user: userId })
      .sort({ orderDate: -1 })
      .populate("user", "fullname username email")
      .populate("products");
    if (!orders) {
      return res.status(400).json({
        success: false,
        message: "Orders not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const getOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
      error: "Invalid Id",
    });
  }

  try {
    const order = await ORDER.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
};
