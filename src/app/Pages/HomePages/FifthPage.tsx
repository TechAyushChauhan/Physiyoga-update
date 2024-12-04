'use client';

import React, { useState, useEffect, useCallback } from "react";
import { customerReviews } from "./Helper/reviews";

interface Review {
  name: string;
  location: string;
  message: string;
}

const FifthPage: React.FC = () => {
  const reviewsLength = customerReviews.length - 1;
  const [review, setReview] = useState<number>(0);

  const backBtnClick = useCallback(() => {
    setReview((prevReview) => (prevReview <= 0 ? reviewsLength : prevReview - 1));
  }, [reviewsLength]);

  const frontBtnClick = useCallback(() => {
    setReview((prevReview) => (prevReview >= reviewsLength ? 0 : prevReview + 1));
  }, [reviewsLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      frontBtnClick();
    }, 6000);

    return () => clearInterval(interval);
  }, [frontBtnClick]);

  const currentReview = customerReviews[review];

  return (
    <div className="py-8 flex justify-center items-center gap-6 bg-gradient-to-r from-blue-100 to-blue-50" id="reviews">
      <div className="w-full">
        <p className="my-4 text-gray-500 font-bold text-2xl tracking-wide font-rubik">
          More over <span className="text-blue-500">1500+ Customers</span>
        </p>
        <p className="my-4 text-black font-bold text-3xl tracking-wide leading-relaxed font-rubik">
          {"Don't believe us, Check clients word"}
        </p>
        <p className="my-16 flex justify-start items-center relative">
          <span className="absolute -top-4 -left-6 text-blue-500 font-bold text-4xl font-poppins">“</span>
          <span className="block ml-2 text-black text-xl leading-8 font-rubik">
            {currentReview?.message}
          </span>
          <span className="absolute -right-4 -bottom-6 text-blue-500 font-bold text-4xl font-poppins">”</span>
        </p>
        <div className="ml-2 flex flex-wrap justify-between items-center">
          <div>
            <p className="font-poppins text-xl font-bold">{currentReview?.name}</p>
            <p className="mt-1 text-gray-500 font-bold text-lg">{currentReview?.location}</p>
          </div>
          <div className="flex">
            <button
              className="mr-6 text-black border-none bg-transparent text-4xl cursor-pointer hover:text-blue-500"
              type="button"
              onClick={backBtnClick}
            >
              ←
            </button>
            <button
              className="text-black border-none bg-transparent text-4xl cursor-pointer hover:text-blue-500"
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
