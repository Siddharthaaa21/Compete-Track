




const mongoose = require('mongoose');

// Define the schema for notifications
const notificationSchema = new mongoose.Schema({
  platform: String,
  contest_type: String,
  next_start: Date,
  notification_time: Date,
  notification_id: String
});

// Define the schema for the user
const userSchema = new mongoose.Schema({
//   name: String , add requied 
name : { type: String, required: true },

  email: {type: String, required: true},
  notifications: [notificationSchema] // Array of notifications
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
