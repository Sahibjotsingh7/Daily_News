import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";
import logo from "../Images/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/login"); // Redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="news logo" height={"40px"} />
      </div>

      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><NavLink to="/" className="nav-link">Home</NavLink></li>
        <li><NavLink to="/news" className="nav-link">News</NavLink></li>
        <li><NavLink to="/weather" className="nav-link">Weather</NavLink></li>
        <li><NavLink to="/upload" className="nav-link">Upload+</NavLink></li>
        <li><NavLink to="/articles" className="nav-link">Articles</NavLink></li>
        <li><NavLink to="/lost&found" className="nav-link">Lost&Found</NavLink></li>
        {isLoggedIn ? (
          <>
            <li>
              <button onClick={() => navigate("/dashboard")} className="nav-button">
                Dashboard
              </button>
            </li>
            <li>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className="nav-button">Login</NavLink></li>
            <li><NavLink to="/signup" className="nav-button">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;