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
  applyGlobalDiscount,
  likeProduct,
} = require("../controller/productController");

router.use(requireAuth);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/reviews", addUserReview);
router.put("/:id/reviews/:reviewId", updateUserReview);
router.post("/apply-global-discount", applyGlobalDiscount);
router.patch("/:productId/like", likeProduct);
module.exports = router;
