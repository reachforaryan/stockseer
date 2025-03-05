import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import AppRoutes from "./routes/Routes.jsx";
import LocomotiveScroll from "locomotive-scroll";

function App() {
  React.useEffect(() => {
    new LocomotiveScroll();
  }, []);

  return (
    <Router>
      <div className="w-full min-h-screen text-white bg-[#001524]">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
