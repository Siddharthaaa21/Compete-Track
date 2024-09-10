import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Countdown({ nextStart, frequency }) {
  const calculateNextStartDate = (currentDate, frequency) => {
    const nextStartDate = new Date(currentDate);
    
    // Handle frequency cases
    if (frequency === 'weekly') {
      nextStartDate.setDate(nextStartDate.getDate() + 7); // Move forward by 7 days
    } else if (frequency === 'monthly') {
      nextStartDate.setMonth(nextStartDate.getMonth() + 1); // Move forward by 1 month
    }

    return nextStartDate;
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    let nextStartDate = new Date(nextStart);
    let difference = nextStartDate - now;

    // If the event has already passed, move the next start date forward
    if (difference <= 0) {
      nextStartDate = calculateNextStartDate(nextStartDate, frequency);
      difference = nextStartDate - now; // Recalculate the difference
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [nextStart, frequency]); // Include frequency as a dependency

  return (
    <div>
      <span>{Math.max(timeLeft.days, 0)}d </span>
      <span>{Math.max(timeLeft.hours, 0)}h </span>
      <span>{Math.max(timeLeft.minutes, 0)}m </span>
      <span>{Math.max(timeLeft.seconds, 0)}s</span>
    </div>
  );
}

export default Countdown;
