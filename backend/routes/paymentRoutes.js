const express = require("express");
const router = express.Router();
const { checkOut } = require("../controller/paymentController");

router.post("/checkout", checkOut);
module.exports = router;
