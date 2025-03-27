import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../component/LandingPage.jsx";
import Marquee from "../component/Marquee.jsx";
import About from "../component/About.jsx";
import Bench from "../component/dashboard/Bench.jsx";
import Test from "../component/dashboard/Test.jsx";
import Login from "../component/Login.jsx";
import Signup from "../component/Signup.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/stockseer/"
        element={
          <>
            <LandingPage />
            <Marquee />
            <About />
          </>
        }
      />
      <Route path="/stockseer/bench/" element={<Bench />} />
      <Route path="/stockseer/test/" element={<Test />} />
      <Route path="/stockseer/login" element={<Login />} />
      <Route path="/stockseer/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
