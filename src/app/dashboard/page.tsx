"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports for icons
const FaBell = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBell), { ssr: false });
const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
const FaSignOutAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSignOutAlt), { ssr: false });
const FaChartLine = dynamic(() => import("react-icons/fa").then((mod) => mod.FaChartLine), { ssr: false });

const Dashboard: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);  // Add reference for profile menu

  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close notifications if click is outside the notifications panel
      if (notificationsPanelRef.current && !notificationsPanelRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }

      // Close profile menu if click is outside the profile menu
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    { id: 1, message: "Welcome to your Dashboard!" },
    { id: 2, message: "New updates available for your courses." },
    { id: 3, message: "Your subscription is expiring soon." },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Main content area */}
      <div className="flex-grow p-8">
        {/* Header */}
        <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-lg">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              className="relative text-white focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                className="flex items-center space-x-2 text-white"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img
                  src="https://via.placeholder.com/40" // Replace with user's profile picture
                  alt="Profile"
                  className="rounded-full"
                />
                <span className="text-sm">John Doe</span>
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-300 shadow-lg rounded-lg w-48">
                  <ul>
                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={() => router.push("/profile")}>Profile</li>
                    <li className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>Log Out</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        {showNotifications && (
          <div
            ref={notificationsPanelRef}
            className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 w-64 z-50"
          >
            <h3 className="text-lg font-semibold text-blue-400">Notifications</h3>
            <ul className="mt-4 space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="text-gray-700 hover:text-blue-600 flex justify-between items-center">
                  {notification.message}
                  {/* <button className="text-sm text-red-500">X</button> */}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-8">
          {/* Overview Widgets */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Total Courses</h2>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Completed Courses</h2>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Pending Progress</h2>
              <p className="text-3xl font-bold text-yellow-600">2</p>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <ul>
                <li className="text-gray-700 dark:text-gray-300">Completed a course on React Basics.</li>
                <li className="text-gray-700 dark:text-gray-300">Enrolled in "Advanced JavaScript" course.</li>
                <li className="text-gray-700 dark:text-gray-300">Updated profile information.</li>
              </ul>
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className="bg-blue-600 text-white rounded-lg p-6 shadow-lg cursor-pointer hover:bg-blue-700 transition"
                onClick={() => router.push("/courses")}
              >
                <div className="flex items-center space-x-4">
                  <FaBook size={24} />
                  <span className="text-lg font-semibold">View Courses</span>
                </div>
              </div>
              <div
                className="bg-green-600 text-white rounded-lg p-6 shadow-lg cursor-pointer hover:bg-green-700 transition"
                onClick={() => router.push("/profile")}
              >
                <div className="flex items-center space-x-4">
                  <FaUserAlt size={24} />
                  <span className="text-lg font-semibold">View Profile</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
         
        </main>

        {/* Footer */}
        <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-center p-4">
          &copy; {new Date().getFullYear()} Yoga Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
