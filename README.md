# CompeteTrack

CompeteTrack is a comprehensive platform designed to track coding contests from various platforms. The platform keeps users updated on upcoming and ongoing contests, including their locations. It also features an integrated email reminder system using Python, so users never miss an important event.

## Features

- **Track Coding Contests**: Displays upcoming and ongoing contests from major coding platforms.
- **Location Tracking**: Includes contest location details and provides a map integration using Three.js for visual enhancements.
- **Responsive UI**: Built with **React** using **Vite** and styled with **Tailwind CSS** for a seamless user experience across all devices.
- **Real-Time Updates**: MongoDB stores contest details, and the application provides real-time updates.
- **Automated Email Notifications**: Python scripts send reminder emails as contest dates approach.

## Tech Stack

### Frontend
- **React** (using **Vite**)
- **Three.js**: For rendering 3D elements and location visualizations.
- **Tailwind CSS**: To build a clean, responsive design quickly.

### Backend
- **Node.js** and **Express.js**: Handle API requests, user data, and contest details.
- **MongoDB**: For storing contest information and user preferences.

### Python Integration
- **Python**: Sends automatic reminder emails as contest dates get closer, helping users stay prepared.

### Deployment
- **Vercel**: The frontend and backend are both deployed on Vercel for fast, reliable delivery.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Python (for the email notification feature)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/CompeteTrack.git
    ```

2. Install dependencies for the Node.js backend:
    ```bash
    cd CompeteTrack/backend
    npm install
    ```

3. Install dependencies for the React frontend:
    ```bash
    cd ../frontend
    npm install
    ```

4. Set up environment variables for MongoDB and other configurations.

5. Start the development server:
    ```bash
    cd ../backend
    npm run dev
    ```

6. Run the Python mail notification system:
    ```bash
    cd ../python-scripts
    python send_reminder.py
    ```

## Future Enhancements

- **Enhanced User Profiles**: Allow users to select and filter the contests they’re interested in.
- **Push Notifications**: Integrate push notifications for real-time updates.
- **Admin Dashboard**: Build an admin panel to manage contest data manually.

## Contributing

Feel free to submit issues or pull requests to improve the platform.
