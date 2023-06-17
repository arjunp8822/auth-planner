const mongoose = require("mongoose");
const Todo = require("./TodoSchema");
const User = require("./UserSchema");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: String,
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
