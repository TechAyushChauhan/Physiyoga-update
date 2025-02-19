
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircleCheck, 
  faCalendarCheck, 
  faUserMd,
  faAmbulance,
  faHeadset,
  faClipboardCheck
} from "@fortawesome/free-solid-svg-icons";
import { Sparkles, Stars, Shield, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

// Type definitions for props
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ icon, title, description, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className={`relative group rounded-3xl p-6 overflow-hidden ${gradient} shadow-lg hover:shadow-2xl transition-all duration-300`}
  >
    <div className="absolute inset-0 bg-white opacity-[0.97] group-hover:opacity-[0.95] transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/40 transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 relative">
            {title}
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"></span>
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const StatsCard = ({ value, label, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 flex items-center gap-6 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
      {icon}
    </div>
    <div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
  </motion.div>
);

const FourthPage: React.FC = () => {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push('/appointment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-teal-100/40 to-emerald-100/40 rounded-full blur-3xl"
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
          className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
            Cure Tribe?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At Cure Tribe, we specialize in physiotherapy and psychology, delivering expert care that transforms lives.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatsCard value="98%" label="Recovery Rate" icon={<Stars className="w-7 h-7" />} />
          <StatsCard value="100%" label="Client Trust" icon={<Shield className="w-7 h-7" />} />
          <StatsCard value="24/7" label="Support Your Well-being" icon={<Clock className="w-7 h-7" />} />
          <StatsCard value="5+" label="Years Experience" icon={<Sparkles className="w-7 h-7" />} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={<FontAwesomeIcon icon={faUserMd} className="w-7 h-7" />}
            title="Expert Care Team"
            description="Access personalized care from a team of highly skilled physiotherapy and psychology professionals dedicated to your well-being."
            gradient="bg-gradient-to-br from-teal-100/50 to-emerald-100/50"
          />
          <FeatureCard
            icon={<FontAwesomeIcon icon={faAmbulance} className="w-7 h-7" />}
            title="Holistic Health Support"
            description="Round-the-clock guidance to ensure your physical and mental health needs are met whenever you need us."
            gradient="bg-gradient-to-br from-emerald-100/50 to-teal-100/50"
          />
          <FeatureCard
            icon={<FontAwesomeIcon icon={faHeadset} className="w-7 h-7" />}
            title="24/7 Availability"
            description="Dedicated support to help you on your journey toward recovery and wellness, any time of the day."
            gradient="bg-gradient-to-br from-teal-100/50 to-emerald-100/50"
          />
          <FeatureCard
            icon={<FontAwesomeIcon icon={faClipboardCheck} className="w-7 h-7" />}
            title="Easy Enrollment"
            description="Simple and quick registration process to start your journey towards better health."
            gradient="bg-gradient-to-br from-emerald-100/50 to-teal-100/50"
          />
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full text-lg font-semibold text-white transition-all duration-300 shadow-xl hover:shadow-2xl"
            onClick={handleBookAppointment}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            <span className="relative flex items-center gap-3">
              <FontAwesomeIcon icon={faCalendarCheck} className="w-6 h-6" />
              Book Appointment
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FourthPage;