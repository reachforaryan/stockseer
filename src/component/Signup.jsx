import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setPopupMessage("Signup Successful!");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/stockseer/login"); // Redirect after signup
      }, 2000);
    } catch (error) {
      setPopupMessage(error.message);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-zinc-900 overflow-hidden">
      {/* Signup Card */}
      <div className="relative z-10 bg-zinc-800/50 backdrop-blur-xl p-10 rounded-2xl shadow-lg max-w-md w-full text-white border border-gray-700">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-400 peer:not(:placeholder-shown):top-0">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 peer"
              placeholder=" "
            />
            <label className="absolute left-4 top-0 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-400 peer:not(:placeholder-shown):top-0">
              Password
            </label>
          </div>
          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg border border-white hover:bg-white hover:text-zinc-900 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/stockseer/login")}
            className="text-green-400 hover:underline cursor-pointer"
          >
            Log in
          </span>
        </p>
      </div>

      {/* Signup Confirmation Popup */}
      {showPopup && (
        <div className="absolute top-10 px-6 py-4 bg-white text-zinc-900 shadow-xl rounded-lg border border-gray-300">
          <p className="text-center font-semibold">{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Signup;
