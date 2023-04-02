const Blog = require("../models/Blogs");
const User = require("../models/Users");

//GET ALL BLOGS
let getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.json({ blogs: allBlogs });
  } catch (e) {
    console.log(e);
  }
};

//CREATE ONE BLOG
let createOneBlog = async (req, res) => {
  try {
    //parse out fields from POST request
    const user = req.user._id;
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    const categories = req.body.categories;
    const year = req.body.year;

    //pass fields to new Blog model
    //notice how it's way more organized and does the type checking for us
    const newBlog = new Blog({
      user,
      title,
      text,
      author,
      categories,
      year,
    });

    //save our new entry to the database
    const savedData = await Blog.create(newBlog);

    //return the successful request to the user
    res.json({
      success: true,
      blogs: savedData,
    });
  } catch (error) {
    console.log(typeof error);
    console.log(error);
    res.json({
      error: error.toString(),
    });
  }
};

//FIND RANDOM BLOG
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

//FIND ONE BLOG BY ID
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

//FIND USER'S BLOG(S)
let findUserBlog = async (req, res) => {
  try {
    let blog = await Blog.find({ user: req.user._id });

    res.json({
      success: true,
      blogs: blog,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE ONE BLOG BY ID
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

//DELETE USER'S BLOG
let deleteUserBlog = async (req, res) => {
  try {
    const blogToDelete = await Blog.findOne({ id: req.params.id });

    if (!blogToDelete) {
      res.status(401).json({
        success: false,
        message: "Blog could not be found!",
      });
    }

    // const user = await User.findById(req.user._id);

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User could not be found!",
      });
    }

    if (req.user._id.toString() !== blogToDelete.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You are not authorized to update this blog!",
      });
    } else {
      await Blog.deleteOne(blogToDelete);
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE ONE BLOG BY ID
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
    updatedBlog.updatedAt = new Date();

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

//UPDATE USER'S BLOG
let updateUserBlog = async (req, res) => {
  try {
    let originalBlog = await Blog.findOne({ id: req.params.id });

    if (!originalBlog) {
      res.json({
        success: false,
        message: "Blog could not be found!",
      });
    }

    // const user = await User.findById(req.user._id);

    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User could not be found!",
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
    updatedBlog.updatedAt = new Date();

    if (req.user._id.toString() !== originalBlog.user.toString()) {
      res.status(401).json({
        success: false,
        message: "You are not authorized to update this blog!",
      });
    } else {
      await Blog.updateOne(originalBlog, updatedBlog);

      res.json({
        success: true,
        blog: updatedBlog,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE ALL BLOGS
let deleteAllBlogs = async (req, res) => {
  try {
    await Blog.deleteMany({});
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE ALL BLOGS
let deleteAllUserBlogs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    await Blog.deleteMany({ user });

    res.json({ success: true });
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
  deleteAllBlogs,
  findUserBlog,
  updateUserBlog,
  deleteUserBlog,
  deleteAllUserBlogs,
};
