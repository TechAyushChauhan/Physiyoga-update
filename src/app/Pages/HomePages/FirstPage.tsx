'use client'; // Ensures this component is client-side only 

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import Link from "next/link";


const FirstPage: React.FC = () => {
  const [goUp, setGoUp] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true); // Set to true once the component mounts
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  if (!isMounted) {
    return null; // Return nothing until the component is mounted
  }

  return (
    <div className="pt-20">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 text-center text-white p-4 pt-52">
          <p className="mb-3 text-gray-600 font-rubik text-lg font-bold tracking-wide">❤️ Health comes first</p>
          <h2 className="max-w-xl mx-auto text-black font-poppins text-4xl font-bold">
            Live Pain Free with Cure Tribe
          </h2>
          <Link href="/appointment">
            <button
              className="mt-20 bg-blue-600 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="button"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" /> Book Appointment
            </button>
          </Link>

          <div className="flex justify-center space-x-8 mt-24 p-5 bg-orange-400 rounded-3xl">
            <div className="text-center">
              <p className="text-4xl font-semibold">145k+</p>
              <p className="text-xl">Receive Patients</p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-semibold">50+</p>
              <p className="text-xl">Expert Doctors</p>
            </div>

            <div className="text-center">
              <p className="text-4xl font-semibold">10+</p>
              <p className="text-xl">Years of Experience</p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        {/* <div className="absolute bottom-10 right-10">
          <Image
            src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
            alt="Doctor"
            width={500}
            height={500}
            className="w-64 h-64 object-contain"
          />
        </div> */}
      </div>

      <div
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full cursor-pointer transition-opacity duration-300 ${goUp ? 'opacity-100' : 'opacity-0'}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
};

export default FirstPage;
