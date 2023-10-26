const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controller/blogController");

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlogById);
router.delete("/:id", deleteBlogById);

module.exports = router;
