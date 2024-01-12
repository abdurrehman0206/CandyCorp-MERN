const express = require("express");
const router = express.Router();
const passport = require('../config/passport');
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
router.post("/auth/google-login", (req, res, next) => {
  console.log("Test");
  passport.authenticate("google-login", (err, user, info) => {
    console.log("g-auth");
    if (err) {
      console.log("🚀 ~ passport.authenticate ~ err:", err)
      return next(err);
    }

    if (!user) {
      console.log("🚀 ~ passport.authenticate ~ user:", user)
      return res.status(401).json({
        success: false,
        message: "Google login failed",
        error: "Invalid Google credentials",
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log("🚀 ~ req.logIn ~ err:", err)
        return next(err);
      }

      const token = generateToken(user.email, user._id);
      const userPayload = {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        username: user.username,
        image: user.image,
        shoppingCart: user.shoppingCart,
        addresses: user.addresses,
        token,
      };
      console.log(userPayload);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: userPayload,
      });
    });
  })(req, res, next);
 
});



module.exports = router;
