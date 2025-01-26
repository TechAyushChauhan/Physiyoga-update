
'use client';

import React from "react";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import DoctorCard from "./Helper/DoctorCard";

interface Doctor {
  name: string;
  title: string;
  stars: string;
  reviews: string;
}

const SixthPage: React.FC = () => {
  const doctorsData: Doctor[] = [
    {
      name: "Dr. Kathryn Murphy",
      title: "General Surgeons",
      stars: "4.9",
      reviews: "1800",
    },
    {
      name: "Dr. Jacob Jones",
      title: "Hematologists",
      stars: "4.8",
      reviews: "700",
    },
    {
      name: "Dr. Jenny Wilson",
      title: "Endocrinologists",
      stars: "4.7",
      reviews: "450",
    },
    {
      name: "Dr. Albert Flores",
      title: "Hematologists",
      stars: "4.8",
      reviews: "500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Star Rating Component
  const StarRating = ({ stars }: { stars: string }) => {
    const starCount = parseFloat(stars);
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(starCount)
                ? 'text-emerald-400 fill-emerald-400'
                : index === Math.floor(starCount) && starCount % 1 >= 0.5
                ? 'text-emerald-400 fill-emerald-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">({stars})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" id="doctors">
      {/* Background Decorations */}
      <motion.div 
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/40 to-emerald-100/40 rounded-full blur-3xl"
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
        className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Our Doctors
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed"
          >
            Meet our exceptional team of specialist doctors, dedicated to
            providing top-notch healthcare services at Health Plus. Trust in their
            knowledge and experience to lead you towards a healthier and happier
            life.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {doctorsData.map((doctor, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-3">
                <div className="relative mb-4">
                  <img 
                    src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png" 
                    alt={doctor.name}
                    className="w-full h-64 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                    <Award className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.name}
                  </h4>
                  <p className="text-emerald-600 font-medium mb-2">
                    {doctor.title}
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    <StarRating stars={doctor.stars} />
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {doctor.reviews} Patient Reviews
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SixthPage;