const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/coinbase-webhook", async (req, res) => {
  try {
    const event = req.body;
    console.log("🚀 ~ router.post ~ event:", event)

    switch (event.type) {
      case "charge:confirmed":
        try {
          await paymentController.createOrderAndClearCart(event.data.id);
          console.log(
            `Order created and cart cleared for charge ID: ${event.data.id}`
          );
        } catch (error) {
          console.error(
            `Error creating order and clearing cart: ${error.message}`
          );
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).end();
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    res.status(500).end();
  }
});

module.exports = router;
