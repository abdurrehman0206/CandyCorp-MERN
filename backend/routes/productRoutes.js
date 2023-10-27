const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProductToCart,
  removeProductFromCart,
  addUserReview,
  updateUserReview,
} = require("../controller/productController");

router.use(requireAuth);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.patch("/:id/addToCart", addProductToCart);
router.patch("/:id/removeFromCart", removeProductFromCart);
router.delete("/:id", deleteProduct);
router.post("/:id/reviews", addUserReview);
router.put("/:id/reviews/:reviewId", updateUserReview);
module.exports = router;
