import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup Successful!");
      navigate("/login"); // Redirect after signup
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Left Section - Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/assets/signup-image.png" // Replace with your image path
          alt="Signup"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form onSubmit={handleSignup} className="p-10 bg-gray-800 text-white rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 border-none rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 border-none rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span 
            onClick={() => navigate("/login")} 
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
