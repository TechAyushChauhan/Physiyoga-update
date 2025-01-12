"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginFooter from "../Components/loginfooter/page";
import LoginNavbar from "../Components/loginnavbar/page";
import CoursesComponent from "../Components/course/page";
import {
  Book,
  ClipboardList,
  TrendingUp,
  User,
  Video
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Buyedcourses from "../Components/buyedcourse/page";
import MonthlyGoals from "../Components/monthlygoals/monthlygoals";

// Define the type for date values
type DateValue = Date | [Date | null, Date | null] | null;



const Dashboard: React.FC = () => {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [date, setDate] = useState<DateValue>(new Date());

  // Initialize isCollapsed from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    setIsCollapsed(saved ? JSON.parse(saved) : false);

  }, []);



  const handleDateChange = (value: DateValue) => {
    setDate(value);
    // Handle date selection here
    console.log('Selected date:', value);
  };



  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    setIsCollapsed(saved ? JSON.parse(saved) : false);

    // Add scroll event listener
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) { // if scroll down hide the navbar
        setShowNavbar(false);
      } else { // if scroll up show the navbar
        setShowNavbar(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <div className={`fixed w-full top-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <LoginNavbar />
      </div>


      {/* Main Content */}
      <div
        className={`
        flex-grow flex flex-col mt-14
        ${isCollapsed ? 'ml-20' : 'ml-64'}
        transition-all duration-300 ease-in-out
      `}
      >
        <main className="p-6 space-y-6">
          {/* Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Courses Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Total Courses
                </h3>
                <Book className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-sm text-gray-500 mt-2">Active Courses</p>
            </div>

            {/* Completed Courses Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Completed
                </h3>
                <ClipboardList className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">3</p>
              <p className="text-sm text-gray-500 mt-2">Courses Finished</p>
            </div>

            {/* In Progress Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  In Progress
                </h3>
                <TrendingUp className="w-6 h-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-500 mt-2">Ongoing Courses</p>
            </div>
          </section>




          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
            {/* In Progress Card */}


            {/* Calendar Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md text-black">

              <Calendar
                onChange={handleDateChange}
                value={date}
                className="border-none"
                tileClassName="rounded-lg"
              />
            </div>

            <div>
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Recent Activity
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Completed React Basics course</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Enrolled in Advanced JavaScript</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Profile information updated</span>
                  </li>
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => router.push("/courses")}
                    className="flex items-center justify-center space-x-2 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Book className="w-5 h-5" />
                    <span>View Courses</span>
                  </button>
                  <button
                    onClick={() => router.push("/profile")}
                    className="flex items-center justify-center space-x-2 p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <User className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => router.push("/addvideo")}
                    className="flex items-center justify-center space-x-2 p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Video className="w-5 h-5" />
                    <span>View Videos</span>
                  </button>
                </div>
              </div>
            </div>

          </section>

<MonthlyGoals />



        </main>
      </div>

      <Buyedcourses
      />
      <LoginFooter />
    </div>
  );
};

export default Dashboard;