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
  handleSupabaseLogin,
} = require("../controller/userController");
router.post("/auth/google-login", async (req, res) => {
  const { access_token } = req.body;
  const result = await handleSupabaseLogin(access_token);
  return res.status(result.success ? 200 : 500).json(result);
});
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

module.exports = router;
