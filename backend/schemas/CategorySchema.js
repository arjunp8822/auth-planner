const mongoose = require("mongoose");
const Todo = require("./TodoSchema");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: String,
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
