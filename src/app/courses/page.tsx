"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports for icons
const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
const FaSignOutAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSignOutAlt), { ssr: false });
const FaBars = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBars), { ssr: false });
const FaTimes = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimes), { ssr: false });
const FaBell = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBell), { ssr: false });

// Dummy course data
const courses = [
  { id: 1, name: "Joint Shield: Knee Edition", progress: 80, key: "yogaforbeginners" },
  { id: 2, name: "Joint Shield: Lower Back Edition", progress: 50, key: "advancedyogaposes" },
  { id: 3, name: "NeckCare Nexus", progress: 90, key: "neckCare" },
  { id: 4, name: "Scaitcare", progress: 90, key: "scaitcare" },
  { id: 5, name: "ReVive Parkinson’s: Mobility & Strength Rehab", progress: 90, key: "reviveparkinson" }
];

const notifications = [
  { id: 1, message: "New course added: Yoga for Seniors" },
  { id: 2, message: "Your subscription is expiring soon!" },
  { id: 3, message: "You achieved 100% progress on NeckCare Nexus!" }
];

const Courses: React.FC = () => {
  const [userCourses] = useState(courses); // Retaining default courses
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Example API or local storage fetching for user courses
      // setUserCourses(fetchedCourses); Uncomment if API is integrated
    }
  }, []); // No external dependencies here

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  

  return (
    <div className={`flex min-h-screen bg-gray-500 relative`}>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white transform shadow-lg z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 p-6 space-y-6`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Menu</h2>
          <button
            className="text-white focus:outline-none hover:text-gray-300"
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4 cursor-pointer hover:text-gray-300"
            onClick={() => router.push("/profile")}
>
            <FaUserAlt />
            <span>Profile</span>
          </div>
          <div
  className="flex items-center space-x-4 cursor-pointer hover:text-gray-300"
  onClick={() => router.push("/courses")}
>
  <FaBook />
  <span>Courses</span>
</div>

          <div
            className="flex items-center space-x-4 cursor-pointer hover:text-gray-300"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
          <div
            className="flex items-center space-x-4 cursor-pointer hover:text-gray-300"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span>Notifications</span>
          </div>
        </div>
      </aside>

      {/* Hamburger Icon */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 bg-blue-900 text-white p-2 rounded shadow-lg z-50 focus:outline-none hover:bg-blue-800"
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <ul className="mt-4 space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-gray-700 hover:text-blue-600">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full p-8 ml-0 sm:ml-64 transition-all">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Your Yoga Courses
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Manage your courses, track your progress, and explore new learning opportunities.
        </p>

      

        {/* Courses List */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {userCourses.map((course) => (
    <div
      key={course.id}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 ease-in-out"
    >
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{course.name}</h4>
      <div className="space-y-2">
        <progress
          className="w-full h-4 appearance-none"
          max="100"
          value={course.progress}
        ></progress>
        <p className="text-gray-600 dark:text-gray-300">Progress: {course.progress}%</p>
      </div>

      {/* Button Container with Flexbox */}
      <div className="flex justify-between space-x-2">
        {/* View Course Button */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto"
          onClick={() => router.push(`/course/${course.key}`)}
        >
          View Course
        </button>

        {/* Buy Button */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 w-full sm:w-auto"
          onClick={() => console.log(`Buying course: ${course.name}`)} // Placeholder for buying functionality
        >
          Buy
        </button>
      </div>
    </div>
  ))}
</section>


       
      </main>
    </div>
  );
};

export default Courses;