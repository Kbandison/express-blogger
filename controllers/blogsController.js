const Blog = require("../models/Blogs");

let getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.json({ blogs: allBlogs });
  } catch (e) {
    console.log(e);
  }
};

let createOneBlog = async (req, res) => {
  try {
    //parse out fields from POST request
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    const categories = req.body.category;
    const year = req.body.year;

    //pass fields to new Blog model
    //notice how it's way more organized and does the type checking for us
    const newBlog = new Blog({
      title,
      text,
      author,
      categories,
      year,
    });

    //save our new entry to the database
    const savedData = await newBlog.save();

    //return the successful request to the user
    res.json({
      success: true,
      blogs: savedData,
    });
  } catch (error) {
    console.log(typeof e);
    console.log(e);
    res.json({
      error: e.toString(),
    });
  }
};

let findOne = async (req, res) => {
  try {
    let blog = await Blog.findOne();

    res.json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

let findOneById = async (req, res) => {
  try {
    let blog = await Blog.findOne({ id: req.params.id });

    res.json({
      success: true,
      blog: blog,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

let deleteOneById = async (req, res) => {
  try {
    await Blog.deleteOne({ id: req.params.id });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

let updateOneById = async (req, res) => {
  try {
    let originalBlog = await Blog.findOne({ id: req.params.id });

    if (!originalBlog) {
      res.json({
        success: false,
        message: "Blog could not be found!",
      });
    }

    let updatedBlog = {};

    if (req.body.title === undefined) {
      updatedBlog.title = originalBlog.title;
    } else {
      updatedBlog.title = req.body.title;
    }

    if (req.body.text === undefined) {
      updatedBlog.text = originalBlog.text;
    } else {
      updatedBlog.text = req.body.text;
    }

    if (req.body.author === undefined) {
      updatedBlog.author = originalBlog.author;
    } else {
      updatedBlog.author = req.body.author;
    }

    if (req.body.year === undefined) {
      updatedBlog.year = originalBlog.year;
    } else {
      updatedBlog.year = req.body.year;
    }

    if (req.body.categories === undefined) {
      updatedBlog.categories = originalBlog.categories;
    } else {
      updatedBlog.categories = req.body.categories;
    }

    updatedBlog.id = originalBlog.id;
    updatedBlog.createdAt = originalBlog.createdAt;

    await Blog.updateOne(originalBlog, updatedBlog);

    res.json({
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBlogs,
  createOneBlog,
  findOne,
  findOneById,
  deleteOneById,
  updateOneById,
};
