import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth
import { FiLogOut } from "react-icons/fi"; // Import logout icon

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user authentication status

  return (
    <div className="fixed z-[999] w-full px-20 py-5 flex justify-between items-center backdrop-blur-lg bg-black/300 rounded-bl-3xl rounded-br-3xl">
      <div className="logo" onClick={() => navigate("/")}> 
        {/* Logo SVG */} 
      </div>

      <div className="links flex gap-10">
        {/* Show Login/Signup if user is NOT logged in */}
        {!user ? (
          <>
            <button
              className="text-md font-light"
              onClick={() => navigate("/stockseer/login")}
            >
              Login
            </button>
            <button
              className="text-md font-light"
              onClick={() => navigate("/stockseer/signup")}
            >
              Signup
            </button>
          </>
        ) : (
          // Show Logout button when logged in
          <button
            className="text-md font-light flex items-center gap-2"
            onClick={logout}
          >
            <FiLogOut /> Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;