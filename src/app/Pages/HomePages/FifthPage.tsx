'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { customerReviews } from "./Helper/reviews";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

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

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center space-x-1 mb-2">
      {[...Array(5)].map((_, index) => (
        <Star 
          key={index} 
          className={`w-5 h-5 ${
            index < rating 
              ? 'text-emerald-400 fill-emerald-400' 
              : 'text-gray-300'
          }`} 
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100" id="reviews">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="blob absolute -top-1/2 -right-1/2 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/40 to-emerald-100/40 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            translateX: [0, 50, -50, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        <motion.div 
          className="blob-delayed absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -10, 10, 0],
            translateX: [0, -50, 50, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-3xl font-bold text-gray-900 mb-4"
          >
            More than <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">1500+ Customers</span>
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Don't believe us, Check clients' words
          </motion.h2>
        </div>

        <motion.div 
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-2xl hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={review}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative"
            >
              <Quote className="absolute -top-4 md:-top-6 left-0 w-8 h-8 md:w-12 md:h-12 text-teal-500 opacity-50" />
              <Quote className="absolute -bottom-4 md:-bottom-6 right-0 w-8 h-8 md:w-12 md:h-12 text-teal-500 opacity-50 rotate-180" />
              
              {/* Star Rating */}
              <div className="flex justify-center mb-4">
                <StarRating rating={currentReview?.rating || 5} />
              </div>

              <div className="my-8 md:my-12 text-gray-700 text-lg md:text-2xl leading-relaxed font-light text-center italic">
                "{currentReview?.message}"
              </div>

              <motion.div 
                className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center md:text-left flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {currentReview?.name}
                  </h4>
                  <p className="text-emerald-600 font-medium">
                    {currentReview?.location}
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={backBtnClick}
                    aria-label="Previous Review"
                    className="p-3 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={frontBtnClick}
                    aria-label="Next Review"
                    className="p-3 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="mt-8 w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((review + 1) / (reviewsLength + 1)) * 100}%` }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                stiffness: 100 
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
  
export default FifthPage;