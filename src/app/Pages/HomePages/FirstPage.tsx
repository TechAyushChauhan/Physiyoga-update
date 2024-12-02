'use client'; // Ensures this component is client-side only

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Appointment from "../AppointmentPage/Page";
import Image from 'next/image'; // Make sure you import next/image
import "./Styles/FirstPage.css"

const FirstPage: React.FC = () => {
  const [goUp, setGoUp] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false); // Flag to check mounting

  // useEffect to set the mounted flag
  useEffect(() => {
    setIsMounted(true); // Set to true once the component mounts
  }, []);

 // Router will only be used after component mounts
 const [router, setRouter] = useState(null);

 // useEffect to set the mounted flag
//   useEffect(() => {
//     setIsMounted(true);
//     // Only set the router after the component has mounted
//     setRouter(useRouter());
//   }, []);

 // Scroll to top function
 const scrollToTop = () => {
   window.scrollTo({ top: 0, behavior: "smooth" });
 };

 // Handle book appointment button click
//   const handleBookAppointmentClick = () => {
//     if (router) {
//       router.push("/appointment");
//     }
//   };


  // Scroll event listener for showing/hiding scroll-up button
  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  if (!isMounted) {
    return null; // Return nothing until the component is mounted
  }

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ Health comes first</p>
          <h2 className="text-title">
            Find your Doctor and make an Appointment
          </h2>
          <p className="text-description">
            Talk to online doctors and get medical advice, online prescriptions,
            refills, and medical notes within minutes. On-demand healthcare
            services at your fingertips.
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            // Uncomment if you want to use the router
            // onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck}  /> Book Appointment
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="hero-image-section">
          <Image
            className="hero-image"
            src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
            alt="Doctor"
            width={500} // Add width and height
            height={500} // Add width and height
          />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
};

export default FirstPage;
