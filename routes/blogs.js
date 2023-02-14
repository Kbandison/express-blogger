// var express = require("express");
// const app = require("../app");
// var router = express.Router();
// var { validateBlogData } = require("./validation/blogs");
// const { db } = require("../mongo");
// const { v4: uuidv4 } = require("uuid");

// /* GET users listing. */
// router.get("/", (req, res, next) => {
//   res.json({
//     success: true,
//   });
// });

// /* GET blogs default */
// router.get("/", (req, res, next) => {
//   res.json({
//     success: true,
//     route: "blogs",
//     message: "hello from the blogs default route",
//   });
// });

// /*********************MAIN ROUTES***********************/

// //GET ALL BLOGS *DONE*
// router.get("/all", async (req, res, next) => {
//   const blogs = await db()
//     .collection("sample_blogs")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send("error fetching blogs");
//       } else {
//         res.json(result);
//       }
//     });

//   res.json({
//     sucess: true,
//     blogs: blogs,
//   });
// });

// // GET A SINGLE BLOG *DONE*
// router.get("/single", async (req, res, next) => {
//   const blogs = await db()
//     .collection("sample_blogs")
//     .findOne({
//       function(err, result) {
//         if (err) {
//           res.status(400).send("error fetching blogs");
//         } else {
//           res.json(result);
//         }
//       },
//     });

//   res.json({
//     sucess: true,
//     blogs: blogs,
//   });
// });

// //GET SINGLE BLOG BY TITLE *DONE*
// router.get("/single/:id", async (req, res) => {
//   let idToFind = { id: req.params.id };

//   const blog = await db()
//     .collection("sample_blogs")
//     .findOne(idToFind, function (err, result) {
//       if (err) {
//         res.status(400).send("error fetching blogs");
//       } else {
//         res.json(result);
//       }
//     });

//   console.log(blog);

//   res.json({
//     sucess: true,
//     blog: blog,
//   });
// });

// //GET MANY BLOGS *DONE*
// router.get("/many/:title", async (req, res) => {
//   let titleToFind = { title: req.params.title };

//   const blog = await db()
//     .collection("sample_blogs")
//     .find(titleToFind)
//     .sort()
//     .toArray(function (err, result) {
//       if (err) {
//         res.status(400).send("error fetching blogs");
//       } else {
//         res.json(result);
//       }
//     });

//   res.json({
//     sucess: true,
//     blog: blog,
//   });
// });

// //ADD A BLOG *DONE*
// router.post("/create-one", async (req, res, next) => {
//   const matchDocument = {
//     createdAt: new Date(),
//     title: req.body.title,
//     text: req.body.text,
//     author: req.body.author,
//     lastModified: new Date(),
//     categories: req.body.category,
//     id: uuidv4(),
//   };

//   await db()
//     .collection("sample_blogs")
//     .insertOne(matchDocument, function (err, result) {
//       if (err) {
//         res.status(400).send("Error inserting blog!");
//       } else {
//         console.log(`Added a new blog with id ${result.insertedId}`);
//         res.status(204).send();
//       }
//     });

//   res.json({
//     success: true,
//   });
// });

// // //UPDATE A BLOG
// router.put("/update-one/:blogToUpdate", async (req, res) => {
//   try {
//     const blogToFind = req.params.blogToUpdate;

//     const originalBlog = await db().collection("sample_blogs").findOne({
//       title: blogToFind,
//     });

//     if (!originalBlog) {
//       res.json({
//         success: false,
//         message: "Could not find blog in the list",
//       });
//       return;
//     }

//     const updatedBlog = {};

//     if (req.body.title !== undefined) {
//       updatedBlog.title = req.body.title;
//     } else {
//       updatedBlog.title = originalBlog.title;
//     }

//     if (req.body.text !== undefined) {
//       updatedBlog.text = req.body.text;
//     } else {
//       updatedBlog.text = originalBlog.text;
//     }

//     if (req.body.author !== undefined) {
//       updatedBlog.author = req.body.author;
//     } else {
//       updatedBlog.author = originalBlog.author;
//     }

//     if (req.body.category !== undefined) {
//       updatedBlog.category = req.body.category;
//     } else {
//       updatedBlog.category = originalBlog.category;
//     }

//     updatedBlog.createdAt = new Date();
//     updatedBlog.lastModified = new Date();

//     const updateResponse = await db().collection("sample_blogs").updateOne(
//       {
//         title: blogToFind,
//       },
//       {
//         $set: updatedBlog,
//       }
//     );

//     res
//       .json({
//         success: true,
//         updatedBlog,
//       })
//       .status(200);
//   } catch (e) {
//     console.log(e);
//     res
//       .json({
//         success: false,
//         error: String(e),
//       })
//       .status(500);
//   }
// });

// //DELETE BLOG *DONE*
// router.delete("/single/:blogTitle", async (req, res) => {
//   let titleToDelete = { title: req.params.blogTitle };

//   await db()
//     .collection("sample_blogs")
//     .deleteOne(titleToDelete, (err, _result) => {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${titleToDelete.id}!`);
//       } else {
//         console.log("Blog deleted successfully");
//         res.status(200).send(`${titleToDelete.id} deleted successfully`);
//       }
//     });

//   res.json({
//     success: true,
//   });
// });

// //DELETE MULTIPLE BLOGS *DONE*
// router.delete("/many/:blogTitle", async (req, res) => {
//   let titleToDelete = { title: req.params.blogTitle };

//   await db()
//     .collection("sample_blogs")
//     .deleteMany(titleToDelete, (err, _result) => {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${titleToDelete.id}!`);
//       } else {
//         console.log("Blog deleted successfully");
//         res.status(200).send(`${titleToDelete.id} deleted successfully`);
//       }
//     });

//   res.json({
//     success: true,
//   });
// });

// module.exports = router;
