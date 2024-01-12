const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const { checkOut } = require("../controller/paymentController");

router.post("/checkout", requireAuth, checkOut);
module.exports = router;
