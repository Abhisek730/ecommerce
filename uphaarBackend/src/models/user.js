const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email addresses are unique
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    mobile: {
        type: String
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "addresses"
        }
    ],
    paymentInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'payment_information'
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
    // You can add more fields as needed for your user data
    // For example: name, age, profilePicture, etc.
});

// Create a User model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
