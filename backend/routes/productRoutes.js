const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addUserReview,
  updateUserReview,
} = require("../controller/productController");

router.use(requireAuth);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/:id/reviews", addUserReview);
router.put("/:id/reviews/:reviewId", updateUserReview);
module.exports = router;
