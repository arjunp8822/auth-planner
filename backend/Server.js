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
    next();
  } catch (e) {
    return res.status(200).json({ message: "User not authorised" });
  }
}

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieparser());

app.get("/test", authMiddleware, async (req, res) => {
  try {
    const { user } = req.cookies;
    const userFull = await User.find({
      username: user,
    })
      .populate(["categories", "todos"])
      .populate({
        path: "categories",
        populate: { path: "todos" },
      });
    return res.status(200).json(userFull);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const { user } = req.cookies;
    const userFull = await User.find({
      username: user,
    });
    const todos = await Todo.find({
      user: userFull,
    });
    return res.status(200).json(todos);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/categories", authMiddleware, async (req, res) => {
  try {
    const { user } = req.cookies;
    const userFull = await User.find({
      username: user,
    });
    const categories = await Category.find({ user: userFull });
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .populate("categories")
      .populate("todos");
    if (!user) {
      return res.status(500).json({ message: "No user found" });
    }
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/categories/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate("todos");
    if (!category) {
      return res.status(500).json({ message: "No category found" });
    }
    return res.status(200).json(category);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/todos/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(500).json({ message: "No todo found" });
    }
    return res.status(200).json({ message: "Get request authorised" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/categories/create", authMiddleware, async (req, res) => {
  try {
    const { title, user } = req.body;
    const foundUser = await User.findOne({
      username: user,
    });
    const newCategory = new Category({
      title: title,
      user: foundUser._id,
    });

    const savedCategory = await newCategory.save();
    foundUser.categories.push(newCategory);
    await foundUser.save();

    res.status(200).json({ message: "Category saved" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/todos/create", authMiddleware, async (req, res) => {
  try {
    const { title, status, category, user } = req.body;
    if (status != "Low" && status != "Medium" && status != "Urgent") {
      return res
        .status(500)
        .json({ message: "Status must be low, medium or urgent" });
    }
    const foundCategory = await Category.findOne({
      title: category,
    });
    if (!foundCategory) {
      return res.status(500).json({ message: "Category not found" });
    }

    const foundUser = await User.findOne({
      username: user,
    });

    const newTodo = new Todo({
      title: title,
      status: status,
      category: foundCategory._id,
      user: foundUser._id,
    });
    const savedTodo = await newTodo.save();

    foundCategory.todos.push(newTodo);
    foundCategory.save();
    foundUser.todos.push(newTodo);
    await foundUser.save();

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
    const existingUser = await User.findOne({ username: username });
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
    const token = jwt.sign(
      {
        username: username,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.cookie("user", username);
    res.status(200).json({ message: "User registered", user: username });
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
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res
        .status(401)
        .json({ message: "Username or password incorrect" });
    }
    const verifiedUser = await bcrypt.compare(password, existingUser.password);
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
    res.cookie("user", username);
    res.status(200).json({ message: "User logged in", user: username });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

app.get("/loggedin", async (req, res) => {
  try {
    const token = await req.cookies.token;
    const user = await req.cookies.user;
    if (!token) {
      return res.json({
        token: false,
        user: undefined,
      });
    }
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json({
        token: false,
        user: undefined,
      });
    }
    return res.json({
      token: true,
      user: user,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      token: false,
      user: undefined,
    });
  }
});

app.delete("/todos/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Todo.findByIdAndDelete(id);
    res.json({ Message: "Item Deleted" });
  } catch (e) {
    console.log(e);
    res.json({ Message: "Internal server error" });
  }
});

app.listen(4000);
