const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("mongodb");
// const asyncHandler = require("express-async-handler");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const findUser = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });

  !user && res.status(404).send("No user found");

  res.json({
    success: true,
    user: user,
  });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404).json({ message: "No user found here" });
  }

  res.json({
    success: true,
    user: user,
  });
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
          password: password,
          confirmPassword: confirmPassword,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const scope = email.includes("@admin.com")
          ? (User.scope = "admin")
          : (User.scope = "user");

        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          scope,
        });

        await User.create(newUser);

        res.status(201).json({
          success: true,
          user: newUser,
          token: generateToken(newUser._id),
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });

  !user && res.status(404).send("No user found");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const updatedUser = {};

  req.body.firstName === undefined
    ? (updatedUser.firstName = user.firstName)
    : (updatedUser.firstName = req.body.firstName);
  req.body.lastName === undefined
    ? (updatedUser.lastName = user.lastName)
    : (updatedUser.lastName = req.body.lastName);
  req.body.email === undefined
    ? (updatedUser.email = user.email)
    : (updatedUser.email = req.body.email);
  req.body.password === undefined
    ? (updatedUser.password = user.password)
    : (updatedUser.password = hashedPassword);

  updatedUser.id = user.id;
  updatedUser.createdAt = user.createdAt;
  updatedUser.updatedAt = new Date();

  await User.updateOne(user, updatedUser);

  res.json({
    success: true,
    updatedUser: updatedUser,
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findOne({ id: req.params.id });
  console.log(user);

  await user.deleteOne();

  res.json({
    success: true,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    res.status(200).json({
      success: true,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      scope: user.scope,
      _id: user._id,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAllUsers = async (req, res) => {
  await User.deleteMany();

  res.json({
    success: true,
  });
};

// const messageUser = async (req, res) => {
//   try {
//     const tokenHeaderKey = process.env.TOKEN_HEADER_KEY;

//     const token = req.header(tokenHeaderKey);

//     console.log("token ", token);

//     const verifiedTokenPayload = verifyToken(token);

//     if (!verifiedTokenPayload) {
//       return res.json({
//         success: false,
//         message: "ID Token could not be verified",
//       });
//     }

//     console.log(verifiedTokenPayload);
//     const userData = verifiedTokenPayload.userData;

//     if (userData && userData.scope === "user") {
//       return res.json({
//         success: true,
//         message: `I am a normal user with the email: ${userData.email}`,
//       });
//     }

//     if (userData && userData.scope === "admin") {
//       return res.json({
//         success: true,
//         message: `I am an admin user with the email ${userData.email}`,
//       });
//     }

//     throw Error("Access Denied");
//   } catch (error) {
//     // Access Denied
//     return res.status(401).json({ success: false, message: error });
//   }
// };

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = {
  getAllUsers,
  findUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getUser,
  deleteAllUsers,
};
