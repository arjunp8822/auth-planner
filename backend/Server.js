const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./schemas/UserSchema");
require("dotenv").config();

const app = express();

async function main() {
  await mongoose.connect(process.env.MONGO_DB_CONNECTION);
}

main().catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Enter all required fields" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be 6 or more characters" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const existingUser = await User.find({ username: username });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const userData = {
    username: username,
    password: await bcrypt.hash(password, 10),
  };
  const user = new User({
    username: userData.username,
    password: userData.password,
  });
  const savedUser = await user.save();
  res.status(200).json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Enter all required fields" });
  }

  const userData = {
    username: username,
    password: await bcrypt.hash(password, 10),
  };
  const user = new User({
    username: userData.username,
    password: userData.password,
  });
  const savedUser = await user.save();
  res.status(200).json({ message: "User registered" });
});

app.listen(4000);
