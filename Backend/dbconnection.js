let mongoose=require("mongoose");
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);
const task = mongoose.connection;
task.on('connected', () => {
  console.log("Connected to MongoDB successfully");
});
task.on('error', (error) => {
  console.error("Error connecting to MongoDB:", error.message);
});
task.on('disconnected', () => {
  console.log("Disconnected from MongoDB");
});

module.exports = task;