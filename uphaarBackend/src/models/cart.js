const mongoose = require("mongoose");


// Define the Cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This references the User model
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem", // This references the CartItem model
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalItem: {
    type: Number,
    default: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  // You can add more fields as needed for the cart data
  // For example: orderDate, status, shippingAddress, etc.
});

// Create a Cart model from the schema
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
