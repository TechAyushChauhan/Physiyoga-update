'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { customerReviews } from "./Helper/reviews";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import styled from 'styled-components';

// Styled components for animations
const AnimatedBackground = styled.div`
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }

  .blob {
    animation: blob 7s infinite;
  }

  .blob-delayed {
    animation: blob 7s infinite;
    animation-delay: 2s;
  }
`;

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
    const interval = setInterval(frontBtnClick, 6000);
    return () => clearInterval(interval);
  }, [frontBtnClick]);

  const currentReview = customerReviews[review];

  return (
    <AnimatedBackground>
      <div className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-violet-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
          <div className="blob-delayed absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              More than <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">1500+ Customers</span>
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Don't believe us, Check clients word
            </motion.h2>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={review}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative"
              >
                <Quote className="absolute -top-6 left-0 w-12 h-12 text-violet-500 opacity-50" />
                <Quote className="absolute -bottom-6 right-0 w-12 h-12 text-violet-500 opacity-50 rotate-180" />
                
                <div className="my-12 text-gray-700 text-xl md:text-2xl leading-relaxed font-light text-center italic">
                  {currentReview?.message}
                </div>

                <motion.div 
                  className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {currentReview?.name}
                    </h4>
                    <p className="text-violet-600 font-medium">
                      {currentReview?.location}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={backBtnClick}
                      className="p-3 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={frontBtnClick}
                      className="p-3 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="mt-8 w-full bg-gray-200 h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((review + 1) / (reviewsLength + 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};
  
export default FifthPage;