const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
} = require("../controller/orderController");
router.use(requireAuth);
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:userId", getUserOrders);

module.exports = router;
