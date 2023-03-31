var express = require("express");
var router = express.Router();
const blogsController = require("../controllers/blogsController");
const { auth } = require("../Middleware/auth");

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
router.get("/blog-list", blogsController.getAllBlogs);

// GET A SINGLE BLOG *DONE*
router.get("/single", blogsController.findOne);

// GET THE USER'S BLOG(S) *DONE*
router.get("/user-blog", auth, blogsController.findUserBlog);

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
router.post("/create-one", auth, blogsController.createOneBlog);

//UPDATE A BLOG
router.put("/update-single/:id", auth, blogsController.updateOneById);

//UPDATE USER BLOG
router.put("/update-user-blog/:id", auth, blogsController.updateUserBlog);

//DELETE BLOG *DONE*
router.delete("/delete-single/:id", auth, blogsController.deleteOneById);

//DELETE USER BLOG *DONE*
router.delete("/delete-user-blog/:id", auth, blogsController.deleteUserBlog);

//DELETE MULTIPLE BLOGS *DONE*
router.delete("/delete-all", auth, blogsController.deleteAllBlogs);

//DELETE ALL USER BLOGS *DONE*
router.delete("/delete-user-blogs", auth, blogsController.deleteAllUserBlogs);

module.exports = router;
