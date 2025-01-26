"use client"

import React, { useState, useRef } from 'react';
import { 
  Stethoscope, HeartPulse, Users, Award, 
  Play, PauseIcon, MousePointer
} from "lucide-react";
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Navbar from '../Components/navbar/page';

const AnimatedCounter = ({ target, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = target;
    const totalDuration = duration * 1000;
    const increment = end / (totalDuration / 16);

    const counter = setInterval(() => {
      setCount(prevCount => {
        const nextCount = prevCount + increment;
        return nextCount >= end ? end : nextCount;
      });
    }, 16);

    return () => clearInterval(counter);
  }, [target, duration, isInView]);

  return (
    <div ref={ref} className="text-5xl font-bold text-teal-700">
      {Math.round(isInView ? count : 0)}+
    </div>
  );
};

const InteractiveSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-600 to-blue-700 text-white py-20 px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-20"></div>
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            Our Medical Journey
          </motion.h2>
          <p className="text-xl text-teal-100 mb-8">
            Discover our commitment to compassionate healthcare and innovative medical solutions.
          </p>
          <div className="flex space-x-4 items-center">
            <button 
              onClick={toggleVideo}
              className="bg-white text-teal-700 p-4 rounded-full hover:bg-teal-50 transition"
            >
              {isPlaying ? <PauseIcon size={24} /> : <Play size={24} />}
            </button>
            <span className="text-white">
              {isPlaying ? 'Pause Our Story' : 'Play Our Story'}
            </span>
          </div>
        </div>
        <div className="relative">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl"
          >
            <video 
              ref={videoRef}
              src="/videos/BornAgain.mp4"
              className="w-full h-full object-cover"
              loop
              muted
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center space-x-4">
              <MousePointer className="text-teal-600" size={48} />
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Patient Stories
                </h3>
                <p className="text-gray-600">
                  Click to learn more
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
    const router = useRouter();
        const handleBookAppointment = () => {
          router.push('/appointment');
        };
  const statsData = [
    { 
      icon: Stethoscope, 
      title: "Years of Experience", 
      target: 25, 
      color: "teal" 
    },
    { 
      icon: HeartPulse, 
      title: "Patients Treated", 
      target: 5000, 
      color: "blue" 
    },
    { 
      icon: Award, 
      title: "Medical Awards", 
      target: 12, 
      color: "green" 
    }
  ];

  const testimonials = [
    {
      quote: "The compassionate care and thorough treatment I received was exceptional. Dr. Thompson and her team truly care about patient well-being.",
      name: "Emily Rodriguez",
      hospital: "City Medical Center"
    },
    {
      quote: "A perfect blend of expertise, technology, and patient-centered approach. Simply outstanding medical care!",
      name: "Michael Chen",
      hospital: "Wellness Medical Group"
    }
  ];

  return (
    <div>
        <Navbar />
    <div className="bg-gray-50">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-teal-600 to-blue-700 text-white pt-24 pb-36 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-6xl font-extrabold mb-6"
          >
            Compassionate Healthcare Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-2xl text-teal-100 max-w-3xl mx-auto mb-10"
          >
            We don't just treat patients. We provide comprehensive, personalized medical care that transforms lives.
          </motion.p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto md:px-8 relative z-10"> 
  <div className="grid md:grid-cols-3 gap-8 px-4 md:px-0">
    {statsData.map(({ icon: Icon, title, target, color }) => (
      <motion.div 
        key={title}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`
          bg-white 
          p-8 
          rounded-2xl 
          text-center 
          shadow-2xl 
          hover:shadow-3xl 
          transition-all 
          border-b-4 
          border-${color}-500 
          relative 
          z-20
        `}
      >
        <Icon 
          className={`mx-auto mb-6 text-${color}-600`} 
          size={64} 
          strokeWidth={1.5} 
        />
        <AnimatedCounter target={target} />
        <h3 className="text-xl font-semibold text-gray-700 mt-4">
          {title}
        </h3>
      </motion.div>
    ))}
  </div>
</div>

      {/* Interactive Story Section */}
      <InteractiveSection />

      {/* Testimonials */}
      <div className="py-20 px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Patient Experiences
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-teal-500"
              >
                <HeartPulse className="text-teal-500 mb-4" size={48} />
                <p className="text-xl italic text-gray-700 mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600">{testimonial.hospital}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-700 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-8"
          >
            Your Health, Our Priority
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-teal-100 max-w-3xl mx-auto mb-10"
          >
            Schedule a consultation and take the first step towards comprehensive healthcare.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button className="bg-white text-teal-700 px-12 py-4 rounded-full text-xl font-semibold hover:bg-teal-50 transition"
            onClick={handleBookAppointment}>
              Book Appointment
            </button>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AboutPage;