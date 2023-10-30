const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
} = require("../controller/orderController");
router.use(requireAuth);
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:userId", getUserOrders);
router.get("/:orderId", getOrder);

module.exports = router;
