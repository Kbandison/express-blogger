const { application } = require("express");
var express = require("express");
var router = express.Router();

const Blog = require("../models/Blogs");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const allBlogs = await Blog.find({});
    res.json({
      blogs: allBlogs,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
