'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface DoctorCardProps {
  img: string;
  name: string;
  title: string;
  stars: string;
  reviews: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ img, name, title, stars, reviews }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image container */}
      <div className="relative mb-6 rounded-xl overflow-hidden aspect-square bg-gradient-to-br from-violet-100 to-purple-100">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 group-hover:opacity-0 transition-opacity duration-300" />
        <Image
          src={img}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Name */}
        <motion.h4 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors duration-300"
        >
          {name}
        </motion.h4>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-violet-600 font-medium"
        >
          {title}
        </motion.p>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-bold text-gray-900">{stars}</span>
            <span className="text-gray-500">({reviews}+ Reviews)</span>
          </motion.div>

          {/* Book Now Button */}
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-violet-100 text-violet-600 rounded-full font-medium 
                     hover:bg-violet-600 hover:text-white transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;