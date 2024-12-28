"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css"; // Import the CSS file here

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const router = useRouter();

  const openNav = (): void => {
    setNav((prevState) => !prevState);
  };

  const handleLoginClick = (): void => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      router.push("/login");
    }
  };

  const handleScroll = (): void => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShowNavbar(false); // Scrolling down, hide navbar
    } else {
      setShowNavbar(true); // Scrolling up, show navbar
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`navbar-section ${showNavbar ? "visible" : "hidden"}`}>
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
