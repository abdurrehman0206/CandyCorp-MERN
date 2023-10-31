const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  signup,
  login,
  verifyToken,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/userController");
router.get("/verify", verifyToken);
router.post("/signup", signup);
router.post("/login", login);
router.post("/add-address", requireAuth, addAddress);
router.patch("/update-address/:addressId", requireAuth, updateAddress);
router.delete("/delete-address/:addressId", requireAuth, deleteAddress);

module.exports = router;
