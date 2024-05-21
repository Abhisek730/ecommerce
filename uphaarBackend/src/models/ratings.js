const mongoose = require("mongoose");

// Define the Rating schema
const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This references the User model
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // This references the Product model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as needed for the rating data
  // For example: review, ratingDate, etc.
});

// Create a Rating model from the schema
const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
