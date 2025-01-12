import React from 'react';
import { ShieldCheck, HeartHandshake, BicepsFlexed, Brain } from 'lucide-react';
import { FaPrayingHands, FaYinYang } from 'react-icons/fa';


const ServiceCard = ({ service }) => (
  <div className="group relative">
    <div className={`absolute inset-0 ${service.bgGlow} opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg`}></div>
    
    <div className={`relative ${service.bgColor} rounded-lg p-3 border ${service.borderColor} ${service.hoverColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group backdrop-blur-sm`}>
      <div className="flex items-start space-x-3">
        <div className="relative">
          <div className={`absolute inset-0 ${service.iconBg} opacity-75 blur-sm rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
          <div className={`relative rounded-full ${service.iconBg} w-10 h-10 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 border border-white/20`}>
            {React.cloneElement(service.icon, { className: `w-5 h-5 ${service.iconColor} group-hover:rotate-12 transition-transform duration-300` })}
          </div>
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${service.tagBg} ${service.tagText}`}>
              {service.category}
            </span>
            <div className={`h-px flex-1 ${service.lineBg} opacity-20`}></div>
          </div>

          <h3 className="text-base font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-sm text-gray-600 leading-snug group-hover:text-gray-700 transition-colors duration-300">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CentralMessage = () => (
  <div className="py-4 px-3 mb-4">
    <div className="max-w-2xl mx-auto relative">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 rounded-lg rotate-6 blur-2xl transition-transform duration-700 hover:rotate-12"></div>
      <div className="absolute inset-0 bg-gradient-to-l from-teal-200/20 to-green-200/20 rounded-lg -rotate-6 blur-2xl transition-transform duration-700 hover:-rotate-12"></div>
      
      <div className="border-2 border-dashed border-emerald-400 p-4 rounded-lg">
    <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-0.5 rounded-lg shadow-lg">
      <div className="bg-white/95 backdrop-blur-md rounded-lg p-0.5">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-lg overflow-hidden">
          <div className="relative px-4 py-5 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.emerald.400/30%)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,theme(colors.teal.400/30%)_0%,transparent_50%)]"></div>
            
            <div className="relative z-10 space-y-4">
              <h1 className="text-2xl font-bold text-white">
                Balance Your Body & Mind
                <span className="block bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent mt-1 text-xl">
                  Through PhysiYoga
                </span>
              </h1>
              
              <button className="group relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-md opacity-40 group-hover:opacity-75 transition-all duration-300 animate-pulse"></div>
                <div className="relative bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 px-6 py-2 rounded-full text-sm font-semibold text-teal-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-teal-500/30 border border-transparent hover:border-teal-200">
                  Start Your Healing Journey
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
);

const PainManagementLanding = () => {
  const services = [
    {
      title: "Prevention",
      icon: <ShieldCheck />,
      description: "It's never too early to prevent pain. Take proactive steps towards a healthier future.",
      category: "Mind & Body",
      bgColor: "bg-gradient-to-br from-emerald-50/90 via-green-50/90 to-teal-100/90",
      bgGlow: "bg-gradient-to-r from-emerald-400/30 via-green-400/30 to-teal-400/30",
      borderColor: "border-emerald-200",
      hoverColor: "hover:border-emerald-400",
      iconBg: "bg-gradient-to-br from-emerald-400 to-green-500",
      iconColor: "text-white",
      tagBg: "bg-emerald-100",
      tagText: "text-emerald-700",
      lineBg: "bg-emerald-400"
    },
    {
      title: "Holistic Care",
      icon: <HeartHandshake />,
      description: "A solution to live pain free and happy life. All conditions addressed with personalized care.",
      category: "Wellness",
      bgColor: "bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-100/90",
      bgGlow: "bg-gradient-to-r from-cyan-400/30 via-teal-400/30 to-emerald-400/30",
      borderColor: "border-cyan-200",
      hoverColor: "hover:border-cyan-400",
      iconBg: "bg-gradient-to-br from-cyan-400 to-teal-500",
      iconColor: "text-white",
      tagBg: "bg-cyan-100",
      tagText: "text-cyan-700",
      lineBg: "bg-cyan-400"
    },
    {
      title: "Recovery",
      icon: <BicepsFlexed />,
      description: "Repair, recover and regain mobility. Your journey to wellness starts here.",
      category: "Body & Soul",
      bgColor: "bg-gradient-to-br from-teal-50/90 via-cyan-50/90 to-sky-100/90",
      bgGlow: "bg-gradient-to-r from-teal-400/30 via-cyan-400/30 to-sky-400/30",
      borderColor: "border-teal-200",
      hoverColor: "hover:border-teal-400",
      iconBg: "bg-gradient-to-br from-teal-400 to-cyan-500",
      iconColor: "text-white",
      tagBg: "bg-teal-100",
      tagText: "text-teal-700",
      lineBg: "bg-teal-400"
    },
    {
      title: "Inner Peace",
      icon: <FaYinYang />, // or could use <Lotus /> or <Heart />
      description: "Discover tranquility through mindful meditation and gentle yogic practices that calm both mind and body.",
      category: "Therapy & Yoga",
      bgColor: "bg-gradient-to-br from-green-50/90 via-emerald-50/90 to-teal-100/90",
      bgGlow: "bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-400",
      iconBg: "bg-gradient-to-br from-green-400 to-emerald-500",
      iconColor: "text-white",
      tagBg: "bg-green-100",
      tagText: "text-green-700",
      lineBg: "bg-green-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 via-teal-100/50 to-cyan-100/50 opacity-60 blur-2xl -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.slice(0, 2).map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          <CentralMessage />

          <div className="w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-100/50 via-cyan-100/50 to-emerald-100/50 opacity-60 blur-2xl -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.slice(2, 4).map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainManagementLanding;