const mongoose = require("mongoose");

// Define the Address schema
const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This references the User model
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  // You can add more fields as needed for the address data
  // For example: country, additional information, etc.
});

// Create an Address model from the schema
const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
