import  { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionWrapper } from "../../hoc";
import { styles } from "../../styles";
import { slideIn } from "../../utils/motion";
import Countdown from './Countdown'; // Ensure this component exists


const sendNotification = async (contest, platform, user) => {
  console.log("Parameters received:", { contest, platform, user });

  if (!user || !user.email) {
    console.log("User not signed up.");
    alert("Please sign up to receive notifications.");
    return;
  }

  


  const notificationData = {
    message: "Notification sent",
    contest: {
      type: contest.type,
      frequency: contest.frequency,
      time: contest.time,
      next_start: new Date(contest.next_start).toLocaleString(),
      image: contest.imagesrc
    },
    user: {
      id: user.sub, // Use 'sub' from Google ID token
      email: user.email
    },
    platform
  };

  console.log("Notification data:", JSON.stringify(notificationData, null, 2));

  try {
    let response = await fetch('https://compete-track-server.onrender.com/api/notifications', { // Update URL if needed for production
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notificationData)
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }

    const result = await response.json();
    console.log('Notification response:', result);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

//now post this data to the backend to send the email to the user before the contest starts



const contestData = [
  {
    platform: "LeetCode",
    contests: [
      {
        type: "Weekly Contest",
        frequency: "Weekly",
        time: "Sunday 8:00 AM UTC",
        next_start: "2024-09-15T08:00:00Z",
        imagesrc: "assets/platforms/leetcode.png",
        Link: "https://leetcode.com/contest"
      },
      {
        type: "Biweekly Contest",
        frequency: "Biweekly",
        time: "Saturday 8:00 PM UTC",
        next_start: "2024-09-14T20:00:00Z",
        imagesrc: "assets/platforms/leetcode.png",
        Link: "https://leetcode.com/contest"
      }
    ]
  },
  {
    platform: "Codeforces",
    contests: [
      {
        type: "Regular Contest",
        frequency: "Weekly",
        time: "Varies, announced ahead",
        next_start: "2024-09-10T15:00:00Z",
        imagesrc: "assets/platforms/codeforces.png",
        Link: "https://codeforces.com/contests"
      }
    ]
  },
  {
    platform: "CodeChef",
    contests: [
      {
        type: "Long Challenge",
        frequency: "Monthly",
        time: "First Friday, lasts 10 days",
        next_start: "2024-10-04T15:00:00Z",
        imagesrc: "assets/platforms/codechef.png",
        Link: "https://www.codechef.com/contests"
      }
    ]
  },
  {
    platform: "AtCoder",
    contests: [
      {
        type: "Regular Contest",
        frequency: "Weekly",
        time: "Varies, announced ahead",
        next_start: "2024-09-11T15:00:00Z",
        imagesrc: "assets/platforms/atcoder.png",
        Link: "https://atcoder.jp/contests/"
      }
    ]

  },
  {
    platform: "HackerRank",
    contests: [
      {
        type: "Weekly Contest",
        frequency: "Weekly",
        time: "Friday 3:00 PM UTC",
        next_start: "2024-09-13T15:00:00Z",
        imagesrc: "assets/platforms/hackerrank.png",
        Link: "https://www.hackerrank.com/contests"
      }
    ]
  },
  {
    platform: "TopCoder",
    contests: [
      {
        type: "SRM",
        frequency: "Weekly",
        time: "Varies, announced ahead",
        next_start: "2024-09-12T15:00:00Z",
        imagesrc: "assets/platforms/topcoder.png",
        Link: "https://www.topcoder.com/challenges"
      }
    ]
  }
];

function Contest() {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);
  
  return (
    // <div className={` top-[280px] max-w-auto mx-7 left-auto ${styles.paddingY} flex flex-col  gap-11 overflow-y-scroll  `}>
      <div className={`inset-10 top-[280px] mx-7 ${styles.paddingY} flex flex-col gap-11 max-h-[80vh] overflow-y-auto`}>

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-lg shadow-lg  '
        
      >
        {/* <p className={styles.sectionSubText}>Get in touch</p> */}
        <h3 className={styles.sectionHeadText}>Contests</h3>

        {contestData.map((platformData, platformIndex) => (
          <div key={platformIndex} className="mb-8 ">
            <h4 className="text-2xl font-bold mb-4">{platformData.platform}</h4>
            <p className="text-gray-300 mb-4">Upcoming contests by {platformData.platform} :</p>
            {/* <div className="flex items-center gap-4 mb-4 oveflow-x-auto"> */}
            <ul className="list-disc pl-5 space-y-4 ">
              {platformData.contests.map((contest, contestIndex) => (
                
                <li key={contestIndex} className="bg-gray-800 p-4 rounded-lg flex items-start gap-4">
                                    {/* <div className='flex flex-row justify-between py-10'>  */}
                  <img src={contest.imagesrc} alt={platformData.platform} className="w-20 h-20 object-cover rounded xl:m-4 onHover:scale-110 cursor-pointer hower:scale-110"
                  onClick={() => {
                    window.open(contest.Link, "_blank");
                  }
                  }
                   />


                  {/* </div> */}


                  <div className="flex-1">
                    <h5 className="text-lg font-semibold">{contest.type}</h5>
                    <p className="text-gray-400">{contest.frequency}</p>
                    <p className="text-gray-300">{contest.time}</p>
                    <p className="text-gray-300">Next Start: {new Date(contest.next_start).toLocaleString()}</p>
                    <Countdown nextStart={contest.next_start} /> {/* Ensure this component exists */}
                                      {/* <img src={contest.imagesrc} alt={platformData.platform} className="w-20 h-20 object-cover rounded-full" /> */}



                  </div>
                  <img
  src={"assets/notify.png"}
  alt="Notify"
  onClick={() => {
    if (!user || !user.email) {
      alert("Please sign up to receive notifications.");
    } else {
      sendNotification(contest, platformData.platform, user);
    }
  }}
  className="w-10 h-10 object-cover rounded cursor-pointer xl:m-auto"
/>



                 {/* now on click the notification and automatically send an email on the timer upcoming date set  */}



                </li>
              ))}
            </ul>
            
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default SectionWrapper(Contest, "ContestData");
