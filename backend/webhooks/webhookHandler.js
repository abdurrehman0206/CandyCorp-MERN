const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");

router.post("/coinbase-webhook", async (req, res) => {
  try {
    const event = req.body;

    switch (event.event.type) {
      case "charge:confirmed":
        try {
          await paymentController.createOrderAndClearCart(event.event.data.id);
          console.log(
            `Order created and cart cleared for charge ID: ${event.event.data.id}`
          );
        } catch (error) {
          console.error(
            `Error creating order and clearing cart: ${error.message}`
          );
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.event.type}`);
    }

    res.status(200).end();
  } catch (error) {
    console.error(`Webhook error: ${error.message}`);
    res.status(500).end();
  }
});

module.exports = router;
