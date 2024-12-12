"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Using useRouter in the app directory of Next.js
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css"; // Import the CSS file here

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false); // Explicit type for better TS support
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const router = useRouter(); // We can use this for navigation

  const openNav = (): void => {
    setNav((prevState) => !prevState); // Toggle navigation state
  };

  const handleLoginClick = (): void => {
    if (!isButtonDisabled) {
      // Disable the button and show a toast message (you can replace this with your toast implementation)
      setIsButtonDisabled(true);

      // Navigate after a brief message or logic
    
        router.push("/login"); // Redirect to the login page
     // Delay to show message before redirect (optional)
    }
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link href="/">
          Physiyoga <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop Navbar */}
      <ul className="navbar-items">
        <li>
          <Link href="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Reviews
          </a>
        </li>
        <li>
          <a href="#doctors" className="navbar-links">
            Doctors
          </a>
        </li>
        <li>
          <Link href="/contact" className="navbar-links">
            Contact
          </Link>
        </li>
      </ul>

      <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleLoginClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Login
      </button>

      {/* Hamburger Icon for mobile */}
      <div className="mobile-nav">
        <FontAwesomeIcon icon={faBars} onClick={openNav} className="hamb-icon" />
      </div>

      {/* Mobile Navbar */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link href="/" onClick={openNav}>
              Home
            </Link>
          </li>
          <li>
            <a href="#services" onClick={openNav}>
              Services
            </a>
          </li>
          <li>
            <a href="#about" onClick={openNav}>
              About
            </a>
          </li>
          <li>
            <a href="#reviews" onClick={openNav}>
              Reviews
            </a>
          </li>
          <li>
            <a href="#doctors" onClick={openNav}>
              Doctors
            </a>
          </li>
          <li>
            <Link href="/contact" onClick={openNav}>
              Contact
            </Link>
          </li>
        </ul>

        <button
          className="navbar-btn-mobile"
          type="button"
          disabled={isButtonDisabled}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
