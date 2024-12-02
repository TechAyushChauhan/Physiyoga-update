'use client';  // Add this at the top of your component

import React, { useState, useEffect } from "react";
import { customerReviews } from "./Helper/reviews"; // Assume this is a valid import
import "./Styles/FifthPage.css";

// Type definition for a review
interface Review {
  name: string;
  location: string;
  message: string;
}

const FifthPage: React.FC = () => {
  const reviewsLength = customerReviews.length - 1;
  const [review, setReview] = useState<number>(0);
  
  let rMessage: string | undefined, rName: string | undefined, rLocation: string | undefined;

  // Back to previous review
  const backBtnClick = () => {
    setReview((prevReview) => (prevReview <= 0 ? reviewsLength : prevReview - 1));
  };

  // Go to next review
  const frontBtnClick = () => {
    setReview((prevReview) => (prevReview >= reviewsLength ? 0 : prevReview + 1));
  };

  // Update reviews based on the current index
  const handleReviewsUpdation = () => {
    const reviewMessage: Review = customerReviews[review];
    rName = reviewMessage.name;
    rLocation = reviewMessage.location;
    rMessage = reviewMessage.message;
  };

  // Automatically change reviews every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      frontBtnClick();
    }, 6000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  // List review on visit
  handleReviewsUpdation();

  return (
    <div className="review-section" id="reviews">
      <div className="rw-text-content">
        <p className="rw-text-title">
          More over <span className="rw-text-num">1500+ Customers</span>
        </p>

        <p className="rw-text-desc">Don't believe us, Check clients word</p>

        <p className="rw-text-format">
          <span className="rw-text-quote1">''</span>
          <span className="rw-review">{rMessage}</span>
          <span className="rw-text-quote2">''</span>
        </p>

        <div className="rw-authors">
          <div className="rw-names">
            <p className="rw-reviewer-name">{rName}</p>
            <p className="rw-reviewer-place">{rLocation}</p>
          </div>

          <div className="rw-btns">
            <button
              className="rw-next-btn"
              type="button"
              onClick={backBtnClick}
            >
              ←
            </button>
            <button
              className="rw-next-btn"
              type="button"
              onClick={frontBtnClick}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthPage;
