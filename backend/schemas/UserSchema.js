const mongoose = require("mongoose");
const Category = require("./CategorySchema");
const Todo = require("./TodoSchema");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
