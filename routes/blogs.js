var express = require("express");
const app = require("../app");
var router = express.Router();
var { validateBlogData } = require("./validation/blogs");
const { db } = require("../mongo");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.json({
    success: true,
  });
});

/* GET blogs default */
router.get("/", (req, res, next) => {
  res.json({
    success: true,
    route: "blogs",
    message: "hello from the blogs default route",
  });
});

/*********************MAIN ROUTES***********************/

//GET ALL BLOGS *DONE*
router.get("/all", async (req, res, next) => {
  const blogs = await db()
    .collection("sample_blogs")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });

  res.json({
    sucess: true,
    blogs: blogs,
  });
});

// GET A SINGLE BLOG *DONE*
router.get("/single", async (req, res, next) => {
  const blogs = await db()
    .collection("sample_blogs")
    .findOne({
      function(err, result) {
        if (err) {
          res.status(400).send("error fetching blogs");
        } else {
          res.json(result);
        }
      },
    });

  res.json({
    sucess: true,
    blogs: blogs,
  });
});

//GET SINGLE BLOG BY TITLE *DONE*
router.get("/single/:title", async (req, res) => {
  let titleToFind = { title: req.params.title };

  const blog = await db()
    .collection("sample_blogs")
    .findOne(titleToFind, function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });

  console.log(blog);

  res.json({
    sucess: true,
    blog: blog,
  });
});

//GET MANY BLOGS BY TITLE *DONE*
router.get("/many/:title", async (req, res) => {
  let titleToFind = { title: req.params.title };

  const blog = await db()
    .collection("sample_blogs")
    .find(titleToFind)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });

  console.log(blog);

  res.json({
    sucess: true,
    blog: blog,
  });
});

//ADD A BLOG *DONE*
router.post("/create-one", async (req, res, next) => {
  const matchDocument = {
    createdAt: new Date(),
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    lastModified: new Date(),
    categories: req.body.category,
  };

  await db()
    .collection("sample_blogs")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting blog!");
      } else {
        console.log(`Added a new blog with id ${result.insertedId}`);
        res.status(204).send();
      }
    });

  res.json({
    success: true,
  });
});

// //UPDATE A BLOG
// router.post("/update-one/:blogTitle", async (req, res) => {
//   const blogToUpdate = { title: req.params.blogTitle };

//   const updates = {
//     title: req.body.title,
//   };

//   await db().collection("sample_blogs").updateOne(blogToUpdate, updates);

//   res.json({
//     success: true,
//     blog: blogTitle,
//   });
// });

//DELETE BLOG *DONE*
router.delete("/single/:blogTitle", async (req, res) => {
  let titleToDelete = { title: req.params.blogTitle };

  await db()
    .collection("sample_blogs")
    .deleteOne(titleToDelete, (err, _result) => {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${titleToDelete.id}!`);
      } else {
        console.log("Blog deleted successfully");
        res.status(200).send(`${titleToDelete.id} deleted successfully`);
      }
    });

  res.json({
    success: true,
  });
});

//DELETE MULTIPLE BLOGS *DONE*
router.delete("/many/:blogTitle", async (req, res) => {
  let titleToDelete = { title: req.params.blogTitle };

  await db()
    .collection("sample_blogs")
    .deleteMany(titleToDelete, (err, _result) => {
      if (err) {
        res
          .status(400)
          .send(`Error deleting listing with id ${titleToDelete.id}!`);
      } else {
        console.log("Blog deleted successfully");
        res.status(200).send(`${titleToDelete.id} deleted successfully`);
      }
    });

  res.json({
    success: true,
  });
});

module.exports = router;
