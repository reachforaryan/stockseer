import React from "react";
import data from "../data/data.json";
import { FaArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="0.1"
      className="w-full h-screen bg-zinc-900 pt-1"
    >
      {/* Landing page titles */}
      <div className="textStructure mt-40 px-20">
        {data.landingPage.headlines.map((item, index) => (
          <div className="masker">
            <div className="w-fit flex items-end overflow-hidden pr-2">
              {index == 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "8vw" }}
                  transition={{ ease: [0.68, -0.6, 0.32, 1.6], duration: 1 }}
                  className="rounded-md relative w-[9.2vw] h-[9.8vh] -top-[0.5vh] mr-2"
                >
                  <motion.img
                    src={data.landingPage.image}
                    alt="StockSeer"
                    className="w-full h-full object-contain rounded-lg"
                    animate={{
                      y: [0, -10, 0], // Moves up and down
                    }}
                    transition={{
                      duration: 2, // Total duration of one cycle
                      repeat: Infinity, // Loops forever
                      ease: "easeInOut", // Smooth movement
                    }}
                  />
                </motion.div>
              )}
              <h1 className="flex items-center uppercase text-[7vw] h-full leading-[6.5vw] tracking-tighter font-medium">
                {item}
              </h1>
            </div>
          </div>
        ))}
      </div>
      {/* subtexts */}
      <div className="border-t-2 border-zinc-700 mt-45 pt-10 flex justify-between items-center py-5 px-20">
        {data.landingPage.subtext.map((item, index) => (
          <p
            key={index}
            className="text-md font-light tracking-tight leading-none"
          >
            {item}
          </p>
        ))}
        {/* button */}
        <div className="start flex item-center gap-2">
          <div className="arrow flex items-center justify-center px-3 border-[1px] border-zinc-400 rounded-full uppercase text-md">
            {data.landingPage.button}
          </div>
          <div className="arrow flex items-center justify-center w-8 h-8 border-[1px] border-zinc-400 rounded-full">
            <span className="rotate-[45deg]">
              <FaArrowUp />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
