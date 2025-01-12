'use client';

import React from "react";
import { motion } from "framer-motion";
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

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50" id="doctors">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-200/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-violet-200/30 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-violet-600 mb-4"
          >
            Our Programs
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg leading-relaxed"
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
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <DoctorCard
                img="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
                name={doctor.name}
                title={doctor.title}
                stars={doctor.stars}
                reviews={doctor.reviews}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SixthPage;