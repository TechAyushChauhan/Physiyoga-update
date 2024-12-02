"use client"; 
import React, { useState, ChangeEvent  } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

const SubscribeNewsletter: React.FC = () => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // Regular expression for email validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // Handle input change event
  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value);
  };

  // Handle button click event
  const handleBookAppointmentClick = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true); // Disable button immediately on click

      if (emailRegex.test(inputEmail)) {
        // Display success toast and clear email input
        toast.success("Subscribed to Newsletter!", {
          duration: 4000,
          position: "top-center",
        });
        setInputEmail(""); // Clear email input
      } else {
        // Display error toast
        toast.error("Invalid Email Address!", {
          duration: 4000,
          position: "top-center",
        });
      }

      // Enable button after a short delay (same duration as toast)
      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable button after 4 seconds
      }, 4000);
    }
  };

  return (
    <div className="ft-info-p2">
      <p className="ft-input-title">Stay Updated with our Newsletter</p>
      <input
        type="email"
        className="ft-input"
        placeholder="Enter your email address"
        name="email"
        value={inputEmail}
        onChange={handleEmailInput}
        autoComplete="true"
      />
      <button
        className="text-appointment-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleBookAppointmentClick}
      >
        Subscribe
      </button>

      {/* Toast container */}
      <Toaster />
    </div>
  );
};

export default SubscribeNewsletter;
