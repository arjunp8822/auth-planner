const mongoose = require("mongoose");
const Category = require("./CategorySchema");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: String,
  status: {
    type: String,
    enum: ["Low", "Medium", "Urgent"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: Category,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
