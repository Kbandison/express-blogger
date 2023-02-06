var express = require("express");
const app = require("../app");
var router = express.Router();
var { validateBlogData } = require("./validation/blogs");

const sampleBlogs = [
  {
    title: "dicta",
    text: "Iusto et in et. Nulla accusantium fugit. Et qui dolorem inventore soluta et veritatis. Aut ut aut non laudantium eveniet suscipit odit. Sapiente sint nihil nihil sit et molestias. In nisi omnis quas et sed aut minus aperiam ea.\n \rLaudantium quo quisquam quae. Et et quas officia perspiciatis iusto sunt sunt eaque. Quidem sit voluptas deserunt sequi magni.\n \rEst est facere cumque ipsam omnis animi. Voluptatem magnam officiis architecto possimus. Quia similique aut eos qui. Quasi quae sed aliquam.",
    author: "Darren Abbott",
    category: ["Lorem", "sit", "amet"],
    createdAt: "2022-03-22T10:36:37.176Z",
    lastModified: "2022-03-22T10:36:37.176Z",
  },
  {
    title: "ducimus",
    text: "Placeat ea et fuga. Qui itaque quibusdam nam. Maxime nobis quam. Et laudantium sunt incidunt reiciendis.\n \rEarum aut sed omnis autem aliquam architecto corporis sint. Nostrum cumque voluptatem aperiam alias similique. Tenetur et esse omnis praesentium ipsum alias. Impedit rerum qui quia quaerat architecto mollitia est autem. Qui blanditiis earum et qui dolorum reprehenderit. Debitis est temporibus.\n \rEt nam sed. Corporis ut rerum. Ut qui dolore est dolorem ex.",
    author: "Luke Rogahn PhD",
    category: ["Lorem", "ipsum"],
    createdAt: "2022-03-22T15:16:56.285Z",
    lastModified: "2022-03-22T15:16:56.285Z",
  },
  {
    title: "quod",
    text: "Accusamus nisi eos. Tenetur earum tenetur nemo. Qui voluptas temporibus repellendus maxime. Ipsum optio voluptate enim nihil. Ea et dolorem. Omnis unde perspiciatis.\n \rUt odio eaque. Harum non placeat. Eveniet molestiae in cupiditate dolor doloremque rerum eligendi aut ab.\n \rMolestias eligendi et. Nemo velit natus autem numquam atque provident et nulla. In et dolores ad nihil. Delectus quis doloremque asperiores similique. Asperiores id nam vitae nobis labore autem. Dolor aperiam provident quia consectetur aut ut.",
    author: "Maryann Schneider",
    category: ["Lorem", "ipsum", "dolor", "sit", "amet"],
    createdAt: "2022-03-21T20:09:32.298Z",
    lastModified: "2022-03-21T20:09:32.298Z",
  },
  {
    title: "ut",
    text: "Itaque necessitatibus repudiandae. Porro suscipit exercitationem qui atque. Perferendis suscipit debitis sint aut dignissimos nobis ut. Modi ea nihil est vel consequuntur voluptatem. In magnam delectus in eos reiciendis sit est enim eligendi. Sint dicta at.\n \rConsectetur aspernatur alias sed non explicabo blanditiis laborum fugit voluptate. Reiciendis iste aut sit natus qui et in ratione. Placeat qui in voluptatum autem nulla ratione. Commodi sit alias sint sapiente rem. Quia sapiente minus deleniti vitae.\n \rExercitationem numquam omnis maxime dolorum sed deserunt suscipit laudantium. Ad et autem voluptatem esse laudantium et. Id fuga accusamus est sapiente dicta.",
    author: "Dr. Lorenzo Anderson",
    category: ["ipsum", "dolor", "sit", "amet"],
    createdAt: "2022-03-21T23:07:53.447Z",
    lastModified: "2022-03-21T23:07:53.447Z",
  },
  {
    title: "id",
    text: "Porro officia aliquid fugiat sed reprehenderit illo amet doloribus sed. Molestiae vero et. Quae voluptates dolores. Voluptatem facere fuga. Veniam perferendis illo ut sunt earum deleniti.\n \rIusto neque dolorem esse error. Saepe et quia ut corrupti. Autem repellendus similique dolorem sunt in ipsa perferendis. Et excepturi ut voluptatem deserunt accusantium dolores aperiam cum ut.\n \rDoloremque expedita sit et voluptatem unde libero. Numquam beatae sed repellat iusto doloribus fugit tenetur. Possimus et ut adipisci harum voluptatem provident consequatur. Corporis quo aut vel itaque blanditiis illum.",
    author: "Bobbie Dach",
    category: ["amet"],
    createdAt: "2022-03-22T15:14:39.819Z",
    lastModified: "2022-03-22T15:14:39.819Z",
  },
];

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

//GET ALL BLOGS
router.get("/all", (req, res, next) => {
  res.json({
    sucess: true,
    sampleBlogs: sampleBlogs,
  });
});

//GET SINGLE BLOG
router.get("/single/:titleToGet", (req, res) => {
  let titleToFind = req.params.titleToGet;
  console.log(req.params);

  let foundTitle = sampleBlogs.find((t) => t.title === titleToFind);

  if (!foundTitle) {
    res.json({
      success: false,
      message: `${titleToFind} does not exist!`,
    });
  }

  res.json({
    success: `${titleToFind} found!`,
    foundTitle: foundTitle,
  });
});

//ADD A BLOG
router.post("/create-one", (req, res) => {
  try {
    let newBlog = {};

    req.body.title !== undefined
      ? (newBlog.title = req.body.title)
      : res.json({ success: false, message: "Title cannot be blank" });
    req.body.text !== undefined
      ? (newBlog.text = req.body.text)
      : res.json({ success: false, message: "Text cannot be blank" });
    req.body.author !== undefined
      ? (newBlog.author = req.body.author)
      : res.json({ success: false, message: "Author cannot be blank" });
    req.body.category !== undefined
      ? (newBlog.category = req.body.category)
      : res.json({ success: false, message: "Categories cannot be blank" });

    let blogDataCheck = validateBlogData(newBlog);

    if (blogDataCheck.isValid === false) {
      throw Error(blogDataCheck.message);
    }

    sampleBlogs.push(newBlog);
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: String(error),
    });
  }

  res.json({
    success: true,
  });
});

//UPDATE A BLOG
router.put("/update-one/:blogTitle", (req, res) => {
  let blogTitle = req.params.blogTitle;

  let foundTitle = sampleBlogs.find((blog) => blog.title === blogTitle);

  let foundTitleIndex = sampleBlogs.findIndex(
    (blog) => blog.title === blogTitle
  );

  if (!foundTitle) {
    res.json({ success: false, message: `${blogTitle} does not exist!` });
  }

  let newBlog = {};

  req.body.title !== undefined
    ? (newBlog.title = req.body.title)
    : (newBlog.title = foundTitle.title);
  req.body.text !== undefined
    ? (newBlog.text = req.body.text)
    : (newBlog.text = foundTitle.text);
  req.body.author !== undefined
    ? (newBlog.author = req.body.author)
    : (newBlog.author = foundTitle.author);
  req.body.category !== undefined
    ? (newBlog.category = req.body.category)
    : (newBlog.category = foundTitle.category);

  newBlog.createAt = foundTitle.createdAt;
  newBlog.lastModified = new Date();

  sampleBlogs[foundTitleIndex] = newBlog;

  res.json({
    success: true,
  });
});

//DELETE BLOG
router.delete("/single/:blogTitleToDelete", (req, res) => {
  let titleToFind = req.params.blogTitleToDelete;

  let foundTitle = sampleBlogs.findIndex((d) => {
    return d.title === titleToFind;
  });

  sampleBlogs.splice(foundTitle, 1);

  res.json({
    success: `${titleToFind} deleted!`,
  });
});

module.exports = router;
