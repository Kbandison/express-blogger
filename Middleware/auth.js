const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const auth = async (req, res, next) => {
  let token;
  let decoded;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //GET TOKEN FROM HEADER
      token = req.headers.authorization.split(" ")[1];

      //VERIFY THE TOKEN
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //GET THE USER FROM THE TOKEN
      req.user = await User.findById(decoded.id).select("-password"); //.SELECT("-PASSWORD") EXCLUDES THE PASSWORD FROM THE USER OBJECT

      //CALL THE NEXT FUNCTION
      next();
      // res.json({
      //   message1: "Authorized",
      //   message2: req.user,
      // });
    } catch (error) {
      res.status(401).json({
        message1: "Unauthorized",
        message2: error.message,
        message3: token,
        message4: req.user,
      });
    }
  }

  //IF THE TOKEN IS NOT FOUND
  if (!token) {
    res.status(401).json({ message: "Unauthenticated, no token" });
  }
};

module.exports = { auth };
