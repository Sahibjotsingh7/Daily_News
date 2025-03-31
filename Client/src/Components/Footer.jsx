import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import {Link} from "react-router-dom"
import "../App.css";
import logo from "../Images/logo.png"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo & Info */}
        <div className="footer-left">
          <h2 className="logo"><img src={logo} alt="" height={"60px"} /></h2>
          <p>Stay updated with the latest news around the world.</p>
        </div>

        {/* Middle Section: Contact & Socials */}
        <div className="footer-middle">
          <h3>Contact Us</h3>
          <p><FaEnvelope className="icon" /> news.web89@gmail.com</p>
          <p><FaPhone className="icon" /> +123 456 7890</p>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        {/* Right Section: Quick Links */}
        <div className="footer-right">
          <h3>Quick Links</h3>
          <ul>
           <li><Link to="/terms-privacy-help"> Privacy Policy</Link></li> 
            <li><Link to="/terms-privacy-help"> Terms & Conditions</Link></li> 
            <li><Link to="/terms-privacy-help"> Help</Link></li> 
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Daily News. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
