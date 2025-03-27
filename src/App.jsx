import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Sidebar from "./component/Sidebar.jsx";
import Footer from "./component/Footer.jsx";
import AppRoutes from "./routes/Routes.jsx";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  const locomotiveScrollRef = useRef(null);
  
  useEffect(() => {
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      multiplier: 0.5,
      lerp: 0.05,
      smartphone: { smooth: true, multiplier: 0.5, lerp: 0.05 },
      tablet: { smooth: true, multiplier: 0.5, lerp: 0.05 },
    });

    return () => locomotiveScrollRef.current?.destroy();
  }, []);

  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div 
      data-scroll-container 
      className={`w-full text-white bg-zinc-900 min-h-screen flex flex-col ${isAuthPage ? "p-0 h-screen" : ""}`}
    >
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <Sidebar />}

      <main className={`flex-grow ${isAuthPage ? "p-0 m-0 h-full flex justify-center items-center" : "pt-20"}`}>
        <AppRoutes />
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
  