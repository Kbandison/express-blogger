//Library import
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Create a blog schema
const blogSchema = new mongoose.Schema({
  title: String,
  text: String,
  author: String,
  year: Number,
  categories: [String],
  id: { type: String, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
});

//Register model to collection
const Blog = mongoose.model("sample_blog", blogSchema);

// Make model acceible
module.exports = Blog;
