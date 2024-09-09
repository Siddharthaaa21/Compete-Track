require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

// Define subdocument schemas
const contestSchema = new mongoose.Schema({
  type: String,
  frequency: String,
  time: String,
  next_start: String,
  image: String
});

const userSchema = new mongoose.Schema({
  id: String,
  email: String
});

// Define the main Notification schema
const notificationSchema = new mongoose.Schema({
  message: String,
  contest: contestSchema, // Use the contest schema here
  user: userSchema,       // Use the user schema here
  platform: String,
  date: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  // No need for useNewUrlParser and useUnifiedTopology options
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find(); // Fetch all notifications
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ message: 'Error fetching notifications', error: error.message });
  }
});

app.post('/api/notifications', async (req, res) => {
  try {
    const { message, contest, user, platform } = req.body;

    // Validate incoming data
    if (!message || !contest || !user || !platform) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new notification
    const newNotification = new Notification({
      message,
      contest,
      user,
      platform,
      date: new Date()
    });

    await newNotification.save();
    res.status(200).json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error saving notification:', error.message, error.stack); // Log full error details
    res.status(500).json({ message: 'Error saving notification', error: error.message });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
