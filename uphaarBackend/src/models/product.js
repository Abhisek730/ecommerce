const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  sizes: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating", // This references the Rating model
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review", // This references the Review model
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // This references the Category model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  newRatings: {
    type: Number,
    required: true,
  },
  // You can add more fields as needed for the product data
  // For example: productCode, manufacturer, etc.
});

// Create a Product model from the schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
