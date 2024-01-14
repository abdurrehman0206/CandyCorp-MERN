const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createBundle,
  getBundles,
  getBundle,
  updateBundle,
  deleteBundle,
  addProductToBundle,
  removeProductFromBundle,
} = require("../controller/bundleController");

router.use(requireAuth);
router.post("/", createBundle);
router.get("/", getBundles);
router.get("/:id", getBundle);
router.put("/:id", updateBundle);
router.delete("/:id", deleteBundle);

module.exports = router;
