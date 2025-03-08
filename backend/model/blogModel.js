const mongoose = require("mongoose");

// Define Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
});

// Create Model
const BlogPost = mongoose.model("BlogPost", blogSchema);
module.exports = BlogPost;
