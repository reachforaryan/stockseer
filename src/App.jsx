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
      <div className="w-full text-white bg-zinc-900">
        <Navbar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
