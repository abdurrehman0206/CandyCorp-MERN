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
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  googleLogin,
} = require("../controller/userController");
router.get("/verify", verifyToken);
router.post("/signup", signup);
router.post("/login", login);
router.post("/add-address", requireAuth, addAddress);
router.patch("/update-address/:addressId", requireAuth, updateAddress);
router.delete("/delete-address/:addressId", requireAuth, deleteAddress);
router.post("/add-to-cart", requireAuth, addToCart);
router.get("/get-cart", requireAuth, getCart);
router.put("/update-cart-item", requireAuth, updateCartItem);
router.delete("/remove-from-cart/:productId", requireAuth, removeFromCart);
router.post("/google-login", googleLogin);

module.exports = router;
