import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/stockseer/"); // Redirect after login
    } catch (error) {
      alert("Invalid Credentials! Try again.");
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Left Section - Image */}
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/assets/login-image.png" // Replace with your image path
          alt="Login"
          className="w-3/4 h-auto"
        />
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <form onSubmit={handleLogin} className="p-10 bg-gray-800 text-white rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold mb-4 text-center">Log In</h2>
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
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
            Log In
          </button>
          <p>
            Don't have an account?{" "}
            <span 
            onClick={() => navigate("/signup")} 
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
