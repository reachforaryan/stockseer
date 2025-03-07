import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import data from "../data/data.json";

function About() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="0.4"
      className="w-full py-20 bg-[#D6CC99] rounded-tl-3xl rounded-tr-3xl text-black -mt-70"
      style={{ height: "auto", minHeight: "100vh" }}
    >
      <h1 className="text-5xl p-12.5 leading-15 tracking-tight font-light">
        {data.about.statement}
      </h1>
      <div className="features flex gap-5 border-t-[2px] border-[#a89e67] my-10">
        <div className="w-1/2 flex items-center p-12.5">
          {data.about.featureHeading}
        </div>
        <div className="w-1/4 p-12.5">
          {data.about.featureList.map((item, index) => (
            <p key={index} className="mb-4 last:-mb-10">
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full border-t-[2px] p-12.5 border-[#a89e67] flex gap-5 h-[70vh] relative justify-center items-center">
        <div className="w-1/2 mr-180">
          <h1 className="text-5xl leading-15 tracking-tight font-light mb-4">
            {data.about.header}
          </h1>
          <motion.button
            className="px-6 py-4 bg-zinc-900 rounded-full text-white flex uppercase gap-5 items-center"
            onClick={() => navigate("/stockseer/bench")} // Navigate to /bench on click
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {data.about.button}
            <div className="w-2 h-2 bg-zinc-100 rounded-full"></div>
          </motion.button>
        </div>
        <motion.div
          className="absolute w-80vw h-80vh rounded-4xl mt-10"
          style={{
            top: "50%",
            left: "74%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            width: isHovered ? "85vh" : "50%",
            height: isHovered ? "65vh" : "100%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <img src={data.about.image} className="object-cover w-full h-full rounded-4xl"></img>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
