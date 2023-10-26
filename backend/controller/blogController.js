const BLOG = require("../model/blogModel");
const mongoose = require("mongoose");
const createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  const Blog = new BLOG({ title, content, imageUrl });
  try {
    const newBlog = await BLOG.create(Blog);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Blog creation failed",
      error: error,
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const Blogs = await BLOG.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: Blogs,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const Blog = await BLOG.findById(req.params.id);
    if (!Blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: Blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};

const updateBlogById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const { title, content, imageUrl } = req.body;
    const Blog = await BLOG.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl },
      { new: true }
    );

    if (!Blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: Blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};

const deleteBlogById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      error: "Invalid Id",
    });
  }
  try {
    const Blog = await BLOG.findByIdAndDelete(req.params.id);

    if (!Blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: Blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Error",
      error: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
