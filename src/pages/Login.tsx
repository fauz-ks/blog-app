import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_PORT = process.env.REACT_APP_API_PORT;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Reset error state before validation
    setError("");

    // Validation checks
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}:${API_PORT}/login`, { username, password });
      const { token } = res.data;

      // Dispatch login action and store the token in Redux and localStorage
      dispatch(login({token, username}));
      navigate("/home"); // Redirect to home after successful login
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* Display error message if exists */}
      {error && <p className="error-message">{error}</p>}
      
      <button className="login-btn" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
