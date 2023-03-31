//Library import
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Create a user schema
const usersSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  confirmPassword: String,
  scope: { type: String, enum: ["user", "admin"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

//Register model to collection
const User = mongoose.model("users", usersSchema);

// Make model acceible
module.exports = User;
