const mongoose = require("mongoose");

// Define the Review schema
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields as needed for the review data
  // For example: rating, reviewTitle, reviewDate, etc.
});

// Create a Review model from the schema
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
