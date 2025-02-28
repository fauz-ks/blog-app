import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar: React.FC = () => {
  const { token, username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          MySite
        </Link>
        {token ? <span className="navbar-username">User: {username}</span> : null}
        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

          {token ? (
            <>
              <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
                <button className="navbar-button" onClick={() => dispatch(logout())}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
            <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="navbar-link">Signup</Link>
            </div>
            </>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
