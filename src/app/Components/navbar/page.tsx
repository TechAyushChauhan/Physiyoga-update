"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "0 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        zIndex: 1000,
        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        opacity: showNavbar ? 1 : 0,
      }}
    >
      <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "24px", letterSpacing: ".6px", color: "#1A8EFD" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Physiyoga <span style={{ color: "#54de54", fontWeight: "bold", fontSize: "40px" }}>+</span>
        </Link>
      </h1>

      {/* Desktop Navbar */}
      <ul style={{ listStyleType: "none", display: "flex", gap: "32px", fontFamily: "Rubik, sans-serif" }}>
        <li>
          <Link href="/" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            Home
          </Link>
        </li>
        <li>
          <a href="#services" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            Services
          </a>
        </li>
        <li>
          <a href="#about" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            About
          </a>
        </li>
        <li>
          <a href="#reviews" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            Reviews
          </a>
        </li>
        <li>
          <a href="#doctors" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            Doctors
          </a>
        </li>
        <li>
          <Link href="/contact" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            Contact
          </Link>
        </li>
        <li>
          <Link href="/courses" style={{ textDecoration: "none", color: "black", fontSize: "18px", letterSpacing: ".8px" }}>
            Courses
          </Link>
        </li>
      </ul>

      <button
        style={{
          padding: "14px 20px",
          color: "white",
          backgroundColor: "#1A8EFD",
          border: "1px solid transparent",
          borderRadius: "28px",
          fontSize: "18px",
          fontFamily: "Rubik, sans-serif",
          letterSpacing: ".8px",
          cursor: "pointer",
          transition: "all .4s ease",
        }}
        type="button"
        disabled={isButtonDisabled}
        onClick={handleLoginClick}
      >
        <FontAwesomeIcon icon={faCommentDots} /> Login
      </button>

      {/* Hamburger Icon for mobile */}
      <div style={{ display: "none" }} className="mobile-nav">
        <FontAwesomeIcon icon={faBars} onClick={openNav} className="hamb-icon" />
      </div>

      {/* Mobile Navbar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: nav ? 0 : "-100%",
          width: "100%",
          height: "100vh",
          backgroundColor: "white",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transition: "left .5s ease-in-out",
        }}
      >
        <div onClick={openNav} style={{ position: "absolute", top: "28px", right: "28px" }}>
          <FontAwesomeIcon icon={faXmark} style={{ fontSize: "26px", cursor: "pointer" }} />
        </div>

        <ul style={{ listStyleType: "none", fontSize: "24px", gap: "24px", textAlign: "center" }}>
          <li>
            <Link href="/" onClick={openNav} style={{ textDecoration: "none", color: "black", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
              Home
            </Link>
          </li>
          <li>
            <a href="#services" onClick={openNav} style={{ textDecoration: "none", color: "black", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
              Services
            </a>
          </li>
          <li>
            <a href="#about" onClick={openNav} style={{ textDecoration: "none", color: "black", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
              About
            </a>
          </li>
          <li>
            <a href="#reviews" onClick={openNav} style={{ textDecoration: "none", color: "black", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
              Reviews
            </a>
          </li>
          <li>
            <a href="#doctors" onClick={openNav} style={{ textDecoration: "none", color: "black", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
              Doctors
            </a>
          </li>
          <li>
            <Link href="/contact" onClick={openNav} style={{ textDecoration: "none", color: "black", fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}>
              Contact
            </Link>
          </li>
        </ul>

        <button
          style={{
            padding: "14px 20px",
            color: "white",
            backgroundColor: "#1A8EFD",
            border: "1px solid transparent",
            borderRadius: "28px",
            fontSize: "18px",
            fontFamily: "Rubik, sans-serif",
            letterSpacing: ".8px",
            cursor: "pointer",
            transition: "all .4s ease",
          }}
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
