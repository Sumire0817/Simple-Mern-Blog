const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

// Define Routes
router.get("/", blogController.getAllPosts); //Get all posts
router.get("/:id", blogController.getPostById); //Get post by Id
router.post("/", blogController.createPost); //Create a new post
router.put("/:id", blogController.updatePost); //Update a post
router.delete("/:id", blogController.deletePost); //Delete a post

module.exports = router;
