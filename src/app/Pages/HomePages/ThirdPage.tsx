import React from "react";
import Image from "next/image";

const HighlightedText = ({ children }) => (
  <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent font-semibold">
    {children}
  </span>
);

const SolutionStep = ({ title, description, icon }) => (
  <div className="group transform hover:-translate-y-2 p-8 rounded-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-teal-100 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-50 hover:to-emerald-50">
    <div className="flex items-start gap-4">
      <div className="bg-white/20 p-3 rounded-xl text-white shadow-lg shadow-teal-200/50 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-emerald-500 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <div>
        <h5 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-800 transition-colors">
          {title}
        </h5>
        <p className="text-white/90 leading-relaxed group-hover:text-gray-600 transition-colors">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const Thirdpage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 via-gray-100 to-gray-100" id="about">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section - Centered */}
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold text-gray-900 mb-4 relative inline-block">
              About <HighlightedText>Health Plus</HighlightedText>
              <div className="absolute left-1/2 -bottom-4 h-1.5 w-32 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transform -translate-x-1/2"></div>
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content Section */}
            <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                <p className="text-xl text-black leading-relaxed">
                  Welcome to <HighlightedText>Health Plus</HighlightedText>, your trusted partner for 
                  <HighlightedText> accessible</HighlightedText> and
                  <HighlightedText> personalized healthcare</HighlightedText>. Our expert doctors offer 
                  <HighlightedText> online consultations </HighlightedText>
                  and specialized services, prioritizing your well-being.
                </p>
              </div>

              <div className="space-y-8">
                <h4 className="text-3xl font-semibold text-gray-900 flex items-center gap-3">
                  <div className="h-10 w-2 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full"></div>
                  Our <HighlightedText>Solutions</HighlightedText>
                </h4>

                <div className="space-y-6 relative">
                  <div className="absolute w-1 bg-gradient-to-b from-teal-200 via-emerald-200 to-transparent h-full left-[2.25rem] top-0 rounded-full"></div>
                  
                  <SolutionStep
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8v13H3V8M1 3h22v5H1z" />
                      </svg>
                    }
                    title="Choose a Specialist"
                    description="Find your perfect specialist and book with ease at Health Plus. Expert doctors prioritize your health, offering tailored care."
                  />

                  <SolutionStep
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    title="Make a Schedule"
                    description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being."
                  />

                  <SolutionStep
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                    title="Get Your Solutions"
                    description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans for your health."
                  />
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="lg:w-1/2 relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-200 to-emerald-200 rounded-2xl blur-2xl opacity-50 animate-pulse"></div>
              <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl rounded-2xl"></div>
              <div className="relative p-4 transform hover:scale-105 transition-transform duration-500">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    className="w-full h-full object-cover"
                    src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
                    alt="Doctor"
                    width={500}
                    height={500}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thirdpage;