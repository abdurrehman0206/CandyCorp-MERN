const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const { createBundle } = require("../controller/bundleController");

router.use(requireAuth);
router.post("/", createBundle);

module.exports = router;
