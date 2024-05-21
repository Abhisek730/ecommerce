const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://ashuagrawalksj:RJV9KBWqVqfiMEfu@cluster0.mscl0mu.mongodb.net/?retryWrites=true&w=majority";

const connectToDb = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = { connectToDb };
