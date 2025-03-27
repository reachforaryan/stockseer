import React from "react";
import data from "../data/data.json";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed z-[999] w-full px-20 py-5 flex justify-between items-center backdrop-blur-lg bg-black/300 rounded-bl-3xl rounded-br-3xl">
      <div className="logo" onClick={() => navigate("/stockseer/")}>
        {/* Logo SVG */}
      </div>
      <div className="links flex gap-10">
        {data.navbar.links.map((item, index) => (
          <button
            key={index}
            className="text-md font-light"
            onClick={() => navigate(`/${item.toLowerCase().replace(" ", "")}`)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
