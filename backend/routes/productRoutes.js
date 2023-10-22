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
} = require("../controller/productController");

// router.use(requireAuth);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.patch("/:id/addToCart", addProductToCart);
router.patch("/:id/removeFromCart", removeProductFromCart);
router.delete("/:id", deleteProduct);

module.exports = router;
