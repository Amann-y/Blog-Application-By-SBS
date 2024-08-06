const express = require("express");
const { checkUserAuth } = require("../Middlewares/auth");
const {
  createBlog,
  getAllBlog,
  getUserSpecificBlog,
  deleteUserSpecificBlog,
  updateUserSpecificBlog,
  getBlogByCategory
} = require("../Controllers/blog");

const router = express.Router();

router.post("/create-blog", checkUserAuth, createBlog);
router.get("/blogs", getAllBlog);
router.get("/user-blog", checkUserAuth, getUserSpecificBlog);
router.delete("/user-blog/:id", checkUserAuth, deleteUserSpecificBlog);
router.put("/user-blog/:id", checkUserAuth, updateUserSpecificBlog);
router.get("/blogs/:category", getBlogByCategory)

module.exports = router;
