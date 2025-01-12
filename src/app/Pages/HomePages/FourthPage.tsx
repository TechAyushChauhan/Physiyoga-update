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
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`relative group rounded-2xl p-6 overflow-hidden ${gradient}`}
  >
    <div className="absolute inset-0 bg-white opacity-[0.97] group-hover:opacity-[0.95] transition-opacity duration-300"></div>
    <div className="relative z-10">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/40 transition-all duration-300">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const StatsCard = ({ value, label, icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/50 backdrop-blur-lg rounded-xl p-4 flex items-center gap-4"
  >
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </motion.div>
);

const FourthPage: React.FC = () => {
  const router = useRouter();

  const handleBookAppointment = () => {
    router.push('/appointment');
  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-violet-100/40 to-purple-100/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-pink-100/40 to-purple-100/40 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Health Plus
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience healthcare excellence with our comprehensive services and dedicated team of professionals.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatsCard value="1000+" label="Happy Patients" icon={<Stars className="w-6 h-6" />} />
          <StatsCard value="50+" label="Expert Doctors" icon={<Shield className="w-6 h-6" />} />
          <StatsCard value="24/7" label="Available" icon={<Clock className="w-6 h-6" />} />
          <StatsCard value="15+" label="Years Experience" icon={<Sparkles className="w-6 h-6" />} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <FeatureCard
            icon={<FontAwesomeIcon icon={faUserMd} className="w-6 h-6" />}
            title="Expert Medical Team"
            description="Access to highly qualified and experienced healthcare professionals dedicated to your well-being."
            gradient="bg-gradient-to-br from-violet-100/50 to-purple-100/50"
          />
          <FeatureCard
            icon={<FontAwesomeIcon icon={faAmbulance} className="w-6 h-6" />}
            title="Emergency Care"
            description="24/7 emergency medical services with rapid response times and expert care when you need it most."
            gradient="bg-gradient-to-br from-purple-100/50 to-pink-100/50"
          />
          <FeatureCard
            icon={<FontAwesomeIcon icon={faHeadset} className="w-6 h-6" />}
            title="24/7 Support"
            description="Round-the-clock customer support and medical assistance through our live chat system."
            gradient="bg-gradient-to-br from-pink-100/50 to-rose-100/50"
          />
          <FeatureCard
            icon={<FontAwesomeIcon icon={faClipboardCheck} className="w-6 h-6" />}
            title="Easy Enrollment"
            description="Simple and quick registration process to start your journey towards better health."
            gradient="bg-gradient-to-br from-rose-100/50 to-violet-100/50"
          />
        </div>

        {/* CTA Button */}
        <div className="text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300"
        onClick={handleBookAppointment}  // Add onClick handler
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
        <span className="relative flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5" />
          Book Appointment
        </span>
      </motion.button>
    </div>
      </div>
    </div>
  );
};

export default FourthPage;