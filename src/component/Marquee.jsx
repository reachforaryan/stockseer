import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import data from "../data/data.json";

function Marquee() {
  const { scrollYProgress } = useScroll();

  // Scroll-dependent tilt (-3° to 3°)
  const tilt = useTransform(scrollYProgress, [0, 1], [0, -3]);

  // Horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-28%"]);

  return (
    <div>
      <div className="w-full overflow-hidden relative">
        {/* Parent div prevents background visibility */}
        <motion.div
          style={{ rotate: tilt, scale: 1.05 }} // Scale prevents edges from showing
          className="w-full py-20 bg-[#445D48] will-change-transform"
        >
          <div className="border-t-2 border-b-2 border-zinc-200 flex whitespace-nowrap">
            <motion.div className="flex gap-10" style={{ x }}>
              {[...Array(3)].map((_, i) => (
                <h1
                  key={i}
                  className="text-[15vw] leading-none uppercase pb-7 -mt-1 font-semibold"
                >
                  {data.marquee.text}
                </h1>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Marquee;
