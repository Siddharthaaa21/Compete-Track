import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Background/BackgroundRender.jsx";
import Contest from "./components/Contest/Contest.jsx";
// import FooterComponents from "./components/Footer/footercomponents.jsx";

function App() {
  return (
    <Router>
      {/* <div className="relative z-0 bg-primary "> */}
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat h-screen w-full">
      <Navbar />
      <Hero/>

      
      <Contest/>
      
      

      </div>
      <div className="bg-hero-pattern bg-auto">
      </div>
      {/* <Footer /> */}
      <Footer />




      </div>
    </Router>
  );
}

export default App;
