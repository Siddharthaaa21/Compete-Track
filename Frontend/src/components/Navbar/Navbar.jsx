import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import DarkOverlay from '../Dark-mode-transition/DarkOverlay';
import { styles } from '../../styles';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [setActive] = useState(""); // Corrected useState hook
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(() => {
    // Check if user info is already in localStorage (for page refresh persistence)
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    console.log(credentialResponse);
    
    // Save user information in state and localStorage
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    // Clear user state and localStorage on logout
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent" // Corrected ternary operator
        
        
      }`

    }
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link to='/' className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src="assets/logo.png" alt="logo" className='w-11 h-11 object-contain'/>
          <p className='text-white text-[18px] font-bold cursor-pointer'>
            CompeteTrack<span className='sm:block hidden'> | Contest update</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10">
          <li className='flex justify-between items-center'>
            <DarkOverlay />
          </li>
          
          {user ? (
            <li className='flex items-center gap-2'>
              <p className='text-white text-[16px] font-bold'>Hello, {user.name}</p>
              <button 
                onClick={handleLogout} 
                className="text-white font-bold cursor-pointer">
                Logout
              </button>
            </li>
          ) : (
            <li className='flex justify-between items-center font-bold'>
              <div style={{ colorScheme: 'dark' }}>
                <GoogleLogin
                  shape='circle'
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                />
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
