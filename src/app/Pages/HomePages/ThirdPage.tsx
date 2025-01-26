
'use client';

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const HighlightedText = ({ children }) => (
  <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent font-bold tracking-wide">
    {children}
  </span>
);

const SolutionStep = ({ title, description, icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-3xl transition-all duration-500 ease-in-out transform hover:-translate-y-3 hover:shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    <div className="relative z-10 p-8 border border-transparent group-hover:border-teal-100 bg-white/10 backdrop-blur-sm group-hover:bg-white/60 transition-all duration-500 rounded-3xl">
      <div className="flex items-start gap-6">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-teal-500 to-emerald-500 p-4 rounded-2xl text-white shadow-lg shadow-teal-200/50 transition-all duration-400 group-hover:scale-110">
            {icon}
          </div>
        </motion.div>
        <div className="flex-grow">
          <h5 className="text-2xl font-bold text-gray-800 mb-3 transition-colors group-hover:text-teal-700 relative">
            <span className="relative">
              {title}
              <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"></span>
            </span>
          </h5>
          <p className="text-gray-600 leading-relaxed text-base group-hover:text-teal-900 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Thirdpage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 selection:bg-teal-100 selection:text-teal-900 perspective-1000" id="about">
      {/* Animated Background Blobs with Enhanced Animation */}
      <div className="absolute pointer-events-none overflow-hidden">
        <motion.div 
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
          className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></motion.div>
        <motion.div 
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
          className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 15, -15, 0],
            translateY: [0, 50, -50, 0]
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        ></motion.div>
      </div>

      <div className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Title Section with Modern Underline and Animation */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-5xl font-extrabold text-gray-900 mb-4 relative inline-block">
              About <HighlightedText>CureTribe</HighlightedText>
              <div className="absolute left-1/2 -bottom-3 h-1.5 w-40 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transform -translate-x-1/2 opacity-80"></div>
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content Section */}
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <p className="text-xl text-gray-800 leading-relaxed font-light tracking-wide">
                  Welcome to <HighlightedText>CureTribe</HighlightedText>, your trusted partner for 
                  <HighlightedText> accessible</HighlightedText> and
                  <HighlightedText> personalized healthcare</HighlightedText>. Our expert doctors offer 
                  <HighlightedText> online consultations </HighlightedText>
                  and specialized services, prioritizing your well-being.
                </p>
              </div>

              <div className="space-y-10">
                <h4 className="text-3xl font-bold text-gray-900 flex items-center gap-4">
                  <div className="h-10 w-2 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
                  Our <HighlightedText>Solutions</HighlightedText>
                </h4>

                <div className="space-y-8 relative">
                  <div className="absolute w-1 bg-gradient-to-b from-teal-200 via-emerald-200 to-transparent h-full left-[2.25rem] top-0 rounded-full"></div>
                  
                  <SolutionStep
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8v13H3V8M1 3h22v5H1z" />
                      </svg>
                    }
                    title="Choose a Specialist"
                    description="Find your perfect specialist and book with ease at CureTribe. Expert doctors prioritize your health, offering tailored care."
                  />

                  <SolutionStep
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    title="Make a Schedule"
                    description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being."
                  />

                  <SolutionStep
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    title="Get Your Solutions"
                    description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans for your health."
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              <div className="relative z-10 p-4 transform transition-transform duration-500 group-hover:scale-105">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      className="w-full h-full object-cover"
                      src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
                      alt="Doctor"
                      width={600}
                      height={600}
                      priority
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thirdpage;
