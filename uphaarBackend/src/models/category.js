const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // This references the same Category model
  },
  level: {
    type: Number,
    required: true,
  },
  // You can add more fields as needed for category data
  // For example: description, products (if a category can have products), etc.
});

// Create a Category model from the schema
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
