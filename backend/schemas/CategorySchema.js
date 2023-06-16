const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: String,
  status: {
    type: String,
    enum: ["Low", "Medium", "Urgent"],
  },
  category: String,
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
