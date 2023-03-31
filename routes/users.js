var express = require("express");
var router = express.Router();
const {
  getAllUsers,
  findUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getUser,
  deleteAllUsers,
} = require("../controllers/userController");
const { auth } = require("../Middleware/auth");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

/*******************MAIN ROUTES******************/

//GET ALL USERS
router.get("/user-list", getAllUsers);

//GET SINGLE USER BY ID
router.get("/find-user/:id", findUser);

//CREATE A USER
router.post("/register", registerUser);

//UPDATE A USER
router.put("/update-user/:id", updateUser);

//DELETE A USER
router.delete("/delete-user/:id", deleteUser);

// LOGIN A USER
router.post("/user-login", loginUser);

// //GET SINGLE USER BY ID
router.get("/user-info", auth, getUser);

//DELETE ALL USERS
router.delete("/delete-all", deleteAllUsers);

module.exports = router;
