const mongoose = require("mongoose");

// Define the OrderItem schema
const orderItemSchema = new mongoose.Schema({
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
  // You can add more fields as needed for the order item data
  // For example: color, orderNotes, etc.
});

// Create an OrderItem model from the schema
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
