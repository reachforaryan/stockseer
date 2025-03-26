import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/Sidebar.jsx";
import Footer from "./component/Footer.jsx";
import AppRoutes from "./routes/Routes.jsx";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 0.5,
      lerp: 0.05,
      smartphone: {
        smooth: true,
        multiplier: 0.5,
        lerp: 0.05,
      },
      tablet: {
        smooth: true,
        multiplier: 0.5,
        lerp: 0.05,
      },
    });

    // Cleanup function
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <Router>
      <div
        data-scroll-container
        className="w-full text-white bg-zinc-900 min-h-screen flex flex-col"
      >
        <Navbar />
        <Sidebar />
        <main className="pt-20 flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
