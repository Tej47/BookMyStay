const mongoose = require("mongoose");
require("dotenv").config(); 

const dbConfig = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error.message);
  }
};

module.exports = dbConfig;
