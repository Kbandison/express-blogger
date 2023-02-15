var express = require("express");
const app = require("../app");
var router = express.Router();
var { validateBlogData } = require("./validation/blogs");
const blogsController = require("../controllers/blogsController");
// const { db } = require("../mongo");

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
router.get("/all", blogsController.getAllBlogs);

// GET A SINGLE BLOG *DONE*
router.get("/single", blogsController.findOne);

//GET SINGLE BLOG BY TITLE *DONE*
router.get("/single/:id", blogsController.findOneById);

//GET MANY BLOGS *DONE*
router.get("/many/:title", async (req, res) => {
  let titleToFind = { title: req.params.title };

  const blog = await db()
    .collection("sample_blogs")
    .find(titleToFind)
    .sort()
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("error fetching blogs");
      } else {
        res.json(result);
      }
    });

  res.json({
    sucess: true,
    blog: blog,
  });
});

//ADD A BLOG *DONE*
router.post("/create-one", blogsController.createOneBlog);

// //UPDATE A BLOG
router.post("/update-single/:id", blogsController.updateOneById);

//DELETE BLOG *DONE*
router.delete("/delete-single/:id", blogsController.deleteOneById);

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
