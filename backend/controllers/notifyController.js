const cron = require('node-cron');
const transporter = require('../utils/mailer');
const User = require('../models/user');

const sendNotificationEmail = (contest, platform, user) => {
  const nextStart = new Date(contest.next_start);

  // Schedule the email to be sent before the contest starts
  const task = cron.schedule('*/1 * * * *', () => { // Example: every minute for testing
    const currentTime = new Date();
    
    if (currentTime >= nextStart) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Contest Reminder: ${contest.type} on ${platform}`,
        text: `The contest "${contest.type}" on ${platform} is starting soon!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });

      task.stop(); // Stop the task after sending the email
    }
  });
};

// Controller for handling notifications
const notifyContest = async (req, res) => {
  const { contest, platform, user } = req.body;

  try {
    const foundUser = await User.findOne({ email: user.email });

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Schedule the email notification
    sendNotificationEmail(contest, platform, user);
    return res.status(200).json({ message: 'Notification scheduled successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { notifyContest };

// this whole code does is to send an email to the user before the contest starts. The email is sent using the nodemailer library, which is configured with the user's email and password. The sendNotificationEmail function schedules an email to be sent using the node-cron library. The notifyContest function is the controller that handles the notification logic. It retrieves the contest, platform, and user data from the request body, finds the user in the database, and schedules the email notification. If the user is not found, it returns a 404 status code. If there is an error, it returns a 500 status code. The notifyContest function is exported to be used in the notifyRoutes file. The notifyRoutes file is then used in the server.js file to define the API endpoint for handling notifications. The sendNotification function in the Contest component sends a POST request to the /api/notify endpoint with the notification data. The response from the server is logged to the console and an alert is displayed to the user. The sendNotification function is called when the user clicks a button to receive notifications for a contest. The Contest component also imports the Countdown component, which displays a countdown timer for the contest. The Countdown component is not shown in the code snippet, but it is assumed to exist in the project. The code snippet demonstrates how the backend and frontend components work together to send email notifications to users before a contest starts. The backend handles the scheduling and sending of emails, while the frontend triggers the notification process and displays alerts to the user. The integration of these components allows users to receive timely notifications about upcoming contests, improving their participation and engagement with the platform. The code snippet provides a clear example of how to implement email notifications in a web application using Node.js, Express, MongoDB, and React. By following this example, developers can enhance the user experience of their applications by providing valuable information and reminders to users. The code snippet also demonstrates best practices for structuring the backend and frontend components of a web application, making it easier to maintain and scale the application in the future. Overall, the code snippet showcases a practical and effective approach to implementing email notifications in a web application, highlighting the importance of communication and user engagement in modern web development.

//in python this code will be like this
// import smtplib
// import os
// from email.message import EmailMessage
// from datetime import datetime
// from apscheduler.schedulers.background import BackgroundScheduler
// from pymongo import MongoClient

// # MongoDB connection
// client = MongoClient(os.getenv('MONGO_URI'))
// db = client['CompeteTrack']
// users_collection = db['users']

// # Configure the mailer
// EMAIL_USER = os.getenv('EMAIL_USER')
// EMAIL_PASS = os.getenv('EMAIL_PASS')
// transporter = smtplib.SMTP('smtp.gmail.com', 587)
// transporter.starttls()
// transporter.login(EMAIL_USER, EMAIL_PASS)

// def send_notification_email(contest, platform, user):
//     next_start = datetime.fromisoformat(contest['next_start'])

//     def send_email():
//         current_time = datetime.now()

//         if current_time >= next_start:
//             msg = EmailMessage()
//             msg.set_content(f"The contest '{contest['type']}' on {platform} is starting soon!")
//             msg['Subject'] = f"Contest Reminder: {contest['type']} on {platform}"
//             msg['From'] = EMAIL_USER
//             msg['To'] = user['email']

//             transporter.send_message(msg)
//             scheduler.shutdown()

//     scheduler = BackgroundScheduler()
//     scheduler.add_job(send_email, 'interval', minutes=1)  # Example: every minute for testing
//     scheduler.start()

// def notify_contest(request):

//     contest = request['contest']
//     platform = request['platform']
//     user = request['user']
