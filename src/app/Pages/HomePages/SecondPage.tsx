
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  HeartPulse, 
  Brain, 
  Microscope, 
  ShieldCheck,
  ArrowRight,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const AnimatedServiceCard = ({ service, isHovered, onMouseEnter, onMouseLeave }) => (
  <div 
    className={`
      group relative overflow-hidden rounded-3xl 
      transition-all duration-500 ease-in-out
      ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
    `}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {/* Background Glow */}
    <div 
      className={`
        absolute inset-0 rounded-3xl opacity-0 
        ${service.gradientBg}
        ${isHovered ? 'opacity-50 blur-2xl' : ''}
        transition-all duration-500
      `}
    ></div>

    {/* Card Content */}
    <div 
      className={`
        relative z-10 bg-white p-6 rounded-3xl 
        border border-opacity-10 overflow-hidden
        transition-all duration-300
        ${service.borderColor}
        ${isHovered ? 'border-opacity-50' : 'border-opacity-10'}
      `}
    >
      {/* Icon and Title Section */}
      <div className="flex items-center justify-between mb-4">
        <div 
          className={`
            p-3 rounded-full 
            ${service.iconBg} 
            ${service.iconShadow}
            transform transition-transform duration-300
            ${isHovered ? 'rotate-12 scale-110' : ''}
          `}
        >
          {React.cloneElement(service.icon, { 
            className: `w-7 h-7 ${service.iconColor}`
          })}
        </div>
        
        {/* Learn More Button */}
        <button 
          className={`
            p-2 rounded-full 
            transition-all duration-300 
            ${isHovered ? 'bg-blue-50 rotate-45' : 'bg-transparent'}
          `}
        >
          <ArrowRight 
            className={`
              w-5 h-5 
              ${service.iconColor} 
              transition-all duration-300
            `} 
          />
        </button>
      </div>

      {/* Title and Description */}
      <div>
        <h3 
          className={`
            text-xl font-bold mb-3 
            ${service.titleColor}
            transition-colors duration-300
            ${isHovered ? 'text-opacity-100' : 'text-opacity-80'}
          `}
        >
          {service.title}
        </h3>
        <p 
          className={`
            text-gray-600 text-sm 
            transition-all duration-300 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}
          `}
        >
          {service.description}
        </p>
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

    const router = useRouter();
    const handleBookAppointment = () => {
      router.push('/appointment');
    };
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 
            className={`
              text-4xl md:text-5xl font-extrabold text-gray-900 mb-6
              transform transition-all duration-1000 
              ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            Compassionate <span className="text-blue-600">Healthcare</span> Solutions
          </h1>
          
          <p 
            className={`
              text-xl text-gray-600 mb-8
              transform transition-all duration-1000 delay-300
              ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            Combining advanced medical technologies with personalized, patient-centered care. 
            Your health, our priority.
          </p>
          
          <div 
            className={`
              flex space-x-4
              transform transition-all duration-1000 delay-500
              ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <button 
              className="
                bg-blue-600 text-white px-8 py-3 rounded-full 
                hover:bg-blue-700 transition-colors
                flex items-center group
              "
              onClick={handleBookAppointment}
            >
              Book Appointment
              <ArrowRight 
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20} 
              />
            </button>
            <button 
              className="
                border-2 border-blue-600 text-blue-600 
                px-8 py-3 rounded-full 
                hover:bg-blue-50 transition-colors
              "
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div className="hidden md:block relative">
          <div 
            className={`
              absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl 
              opacity-0 transition-opacity duration-1000
              ${isAnimating ? 'opacity-50' : ''}
            `}
          ></div>
          <img 
            src="/images/curetribelogofull.png" 
            alt="Medical Services" 
            className={`
              relative rounded-3xl shadow-2xl
              transform transition-all duration-1000
              ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
            `}
          />
        </div>
      </div>
    </div>
  );
};

const QuickAccessSection = () => {
  const quickAccess = [
    {
      icon: <Clock />,
      title: "24/7 Support",
      description: "Round-the-clock medical assistance and emergency services."
    },
    {
      icon: <MessageCircle />,
      title: "Telemedicine",
      description: "Virtual consultations from the comfort of your home."
    },
    {
      icon: <ShieldCheck />,
      title: "Safe & Secure",
      description: "Ensuring patient privacy and top-notch medical standards."
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {quickAccess.map((item, index) => (
            <div 
              key={index} 
              className="
                bg-white p-6 rounded-3xl 
                shadow-lg hover:shadow-xl 
                transform hover:-translate-y-2 
                transition-all duration-300
                group
              "
            >
              <div 
                className="
                  p-3 rounded-full mb-4 
                  bg-blue-50 inline-block
                  group-hover:bg-blue-100 
                  transition-colors
                "
              >
                {React.cloneElement(item.icon, { 
                  className: "w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform"
                })}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MedicalLanding = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "Diagnostic Services",
      icon: <Stethoscope />,
      description: "Advanced diagnostic technologies and comprehensive health screenings to detect and prevent potential health issues early.",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      iconShadow: "shadow-sky-200/50",
      borderColor: "border-sky-200",
      gradientBg: "bg-gradient-to-r from-sky-200/30 to-sky-300/30",
      titleColor: "text-sky-700"
    },
    {
      title: "Specialized Care",
      icon: <HeartPulse />,
      description: "Personalized treatment plans focusing on individual patient needs, combining medical expertise with compassionate care.",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      iconShadow: "shadow-rose-200/50",
      borderColor: "border-rose-200",
      gradientBg: "bg-gradient-to-r from-rose-200/30 to-rose-300/30",
      titleColor: "text-rose-700"
    },
    {
      title: "Neurology Center",
      icon: <Brain />,
      description: "Specialized neurological care using cutting-edge technologies and comprehensive treatment approaches.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      iconShadow: "shadow-purple-200/50",
      borderColor: "border-purple-200",
      gradientBg: "bg-gradient-to-r from-purple-200/30 to-purple-300/30",
      titleColor: "text-purple-700"
    },
    {
      title: "Lab Services",
      icon: <Microscope />,
      description: "State-of-the-art laboratory facilities providing accurate and timely diagnostic testing and research support.",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      iconShadow: "shadow-emerald-200/50",
      borderColor: "border-emerald-200",
      gradientBg: "bg-gradient-to-r from-emerald-200/30 to-emerald-300/30",
      titleColor: "text-emerald-700"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection />
      <QuickAccessSection />
      
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Medical Services
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive healthcare solutions for every stage of life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <AnimatedServiceCard 
                key={index} 
                service={service}
                isHovered={hoveredCard === index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalLanding;