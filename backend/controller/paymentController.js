const coinbase = require("coinbase-commerce-node");
const USER = require("../model/userModel");
const ORDER = require("../model/orderModel");
const Client = coinbase.Client;
const resources = coinbase.resources;
Client.init(process.env.COINBASE_API);

const checkOut = async (req, res) => {
  const { amount, currency } = req.body;
  const userId = req.user.id;

  try {
    const user = await USER.findById(userId).populate({
      path: "shoppingCart.productId",
      select:
        "_id name price quantity inStock onSale salePercentage images type category",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "User does not exist",
      });
    }

    const cartDetails = user.shoppingCart.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const charge = await resources.Charge.create({
      name: `Payment for ${user.fullname || "User"}`,
      description: `Payment for items by ${user.email}`,
      local_price: {
        amount: amount,
        currency: currency,
      },
      pricing_type: "fixed_price",
      metadata: {
        user_id: userId,
        user_name: user.fullname,
        user_email: user.email,
        shopping_cart: cartDetails,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Charge was successful",
      data: charge,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Charge was unsuccessful",
      error: error.message,
    });
  }
};
const createOrderAndClearCart = async (chargeId) => {
  try {
    const charge = await resources.Charge.retrieve(chargeId);

    const userId = charge.metadata.user_id;
    const user = await USER.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const order = new ORDER({
      user: userId,
      products: charge.metadata.shopping_cart,
      totalAmount: charge.local_price.amount,
      status: "Processing",
    });

    const newOrder = await ORDER.create(order);

    user.shoppingCart = [];
    await user.save();

    return newOrder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  checkOut,
  createOrderAndClearCart,
};
