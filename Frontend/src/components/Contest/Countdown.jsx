import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Countdown({ nextStart, frequency }) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const nextStartDate = new Date(nextStart);
    const difference = nextStartDate - now;

    if (difference <= 0) {
      if(frequency === 'weekly' && nextStartDate.getDay() === 0){
        nextStartDate.setDate(nextStartDate.getDate() + 7);
        return calculateTimeLeft();
      }
      if(frequency === 'monthly' && nextStartDate.getDate() === -1||nextStartDate.getDate() === -1 || nextStartDate.hours() === -1 || nextStartDate.minutes() === -1 || nextStartDate.seconds() === -1){
        nextStartDate.setMonth(nextStartDate.getMonth() + 1);
        return calculateTimeLeft();
      }
    }
      // return { days: day, hours: hr, minutes: min, seconds: sec};}


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

    return () => clearInterval(timer);
  }, [nextStart]);

  return (
    <div>
      <span>{timeLeft.days}d </span>
      <span>{timeLeft.hours}h </span>
      <span>{timeLeft.minutes}m </span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
}

export default Countdown;
