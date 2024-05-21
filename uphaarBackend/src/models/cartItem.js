const mongoose = require("mongoose");

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart", // This references the Cart model
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // This references the Product model
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This references the User model
    required: true,
  },
  // You can add more fields as needed for the cart item data
  // For example: color, addedDate, etc.
});

// Create a CartItem model from the schema
const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = CartItem;
