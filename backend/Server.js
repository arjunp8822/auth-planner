const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./schemas/UserSchema");
const Category = require("./schemas/CategorySchema");
const Todo = require("./schemas/TodoSchema");
require("dotenv").config();
const cookieparser = require("cookie-parser");

const app = express();

async function main() {
  await mongoose.connect(process.env.MONGO_DB_CONNECTION);
}

main().catch((err) => console.log(err));

async function authMiddleware(req, res, next) {
  try {
    const token = await req.cookies.token;
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
      return res.status(401).json({ message: "User not authorised" });
    }
    return res.status(200).json({ message: "User authorised" });
  } catch (e) {
    return res.status(200).json({ message: "User not authorised" });
  }
  next();
}

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieparser());

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find({}).populate("category");
    console.log(todos);
    return res.status(200).json({ message: "Get request authorised" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({ message: "Get request authorised" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("todos");
    console.log(category);
    return res.status(200).json({ message: "Get request authorised" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/categories/create", async (req, res) => {
  try {
    const { title } = req.body;
    const newCategory = new Category({
      title: title,
    });
    const savedCategory = await newCategory.save();
    res.status(200).json({ message: "Category saved" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/todos/create", async (req, res) => {
  try {
    const { title, status, category } = req.body;
    if (status != "Low" && status != "Medium" && status != "Urgent") {
      return res
        .status(500)
        .json({ message: "Status must be low, medium or urgent" });
    }
    const foundCategory = await Category.find({
      title: category,
    });
    if (foundCategory.length === 0) {
      return res.status(500).json({ message: "Category not found" });
    }
    const newTodo = new Todo({
      title: title,
      status: status,
      category: foundCategory[0]._id,
    });
    const savedTodo = await newTodo.save();

    foundCategory[0].todos.push(newTodo);
    foundCategory[0].save();

    res.status(200).json({ message: "Todo saved" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User logged out" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Enter all required fields" });
    }
    const existingUser = await User.find({ username: username });
    if (existingUser.length === 0) {
      return res
        .status(401)
        .json({ message: "Username or password incorrect" });
    }
    const verifiedUser = await bcrypt.compare(
      password,
      existingUser[0].password
    );
    if (!verifiedUser) {
      return res
        .status(401)
        .json({ message: "Username or password incorrect" });
    }
    const token = jwt.sign(
      {
        username: username,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.status(200).json({ message: "User logged in", user: username });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.listen(4000);
