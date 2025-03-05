import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../component/LandingPage.jsx";
import Marquee from "../component/Marquee.jsx";
import About from "../component/About.jsx";
import Bench from "../component/dashboard/Bench.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={
        <>
          <LandingPage />
          <Marquee />
          <About />
        </>
      } />
      <Route path="/bench" element={<Bench />} />
    </Routes>
  );
};

export default AppRoutes;
