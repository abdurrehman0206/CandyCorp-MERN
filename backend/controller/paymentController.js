const coinbase = require("coinbase-commerce-node");
const Client = coinbase.Client;
const resources = coinbase.resources;
Client.init(process.env.COINBASE_API);

const checkOut = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const charge = await resources.Charge.create({
      name: "Test",
      description: "Test charge",
      local_price: {
        amount: amount,
        currency: currency,
      },
      pricing_type: "fixed_price",
      metadata: {
        user_id: "123",
      },
    });
    if (charge) {
      return res.status(200).json({
        success: true,
        message: "Charge was successful",
        data: charge,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Charge was unsuccessful",
      error: error,
    });
  }
};

module.exports = {
  checkOut,
};
