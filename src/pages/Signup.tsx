import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const API_PORT = process.env.REACT_APP_API_PORT;

  const handleSignup = async () => {
    // Reset error state before validation
    setError("");

    // Validation checks
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (password === username) {
      setError("Password cannot be the same as the username.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}:${API_PORT}/signup`, { username, password });
      const token = res.data.token;

      // Save token in localStorage
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("Signup failed: " + error.response.data.message);
      } else {
        setError("Signup failed: " + (error as Error).message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your Account</h2>
      <input
        type="text"
        className="signup-input"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="signup-input"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Display error message if exists */}
      {error && <p className="error-message">{error}</p>}
      
      <button className="signup-btn" onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
