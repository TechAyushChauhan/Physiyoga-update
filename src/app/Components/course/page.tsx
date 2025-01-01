/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { setloader } from "../../../../store/slices/loaderSlice";
import { useAppDispatch } from "../../../../lib/hooks";

// Dynamic imports for icons
const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
const FaSignOutAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSignOutAlt), { ssr: false });
const FaBars = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBars), { ssr: false });
const FaTimes = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimes), { ssr: false });
const FaBell = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBell), { ssr: false });

// Dummy course data
const courses = [
  { id: 1, name: "Joint Shield: Knee Edition", progress: 80, key: "yogaforbeginners", fees: 255 },
  { id: 2, name: "Joint Shield: Lower Back Edition", progress: 50, key: "advancedyogaposes", fees: 260 },
  { id: 3, name: "NeckCare Nexus", progress: 90, key: "neckCare", fees: 265 },
  { id: 4, name: "Scaitcare", progress: 90, key: "scaitcare", fees: 270 },
  { id: 5, name: "ReVive Parkinson’s: Mobility & Strength Rehab", progress: 90, key: "reviveparkinson", fees: 275 }
];

const notifications = [
  { id: 1, message: "New course added: Yoga for Seniors" },
  { id: 2, message: "Your subscription is expiring soon!" },
  { id: 3, message: "You achieved 100% progress on NeckCare Nexus!" }
];

const CoursesComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [userCourses, setUserCourses] = useState([]); // Retaining default courses
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const getCourses = async (): Promise<any> => {
    dispatch(setloader(true));
    try {
      const response = await fetch('/api/addcourse', {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch courses');
      }
      const apiResponse = await response.json();
      setUserCourses(apiResponse.data);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      throw error;
    }
    dispatch(setloader(false));
  };

  useEffect(() => {
    dispatch(setloader(false));
    getCourses();
  }, []); // No external dependencies here

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  console.log(userCourses);

  return (
    <div className={`flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative`}>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="fixed top-16 right-4 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg rounded-lg p-4 w-64 z-50 text-white">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <ul className="mt-4 space-y-2">
            {notifications.map((notification) => (
              <li key={notification.id} className="text-gray-300 hover:text-blue-200 transition-colors duration-300">
                {notification.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full p-8 ml-5 sm:ml-64 transition-all">
        <h2 className="text-3xl font-bold text-gradient mb-4">
          Welcome to Yoga Courses
        </h2>
        <p className="text-gray-300 mb-8">
          Manage your courses, track your progress, and explore new learning opportunities.
        </p>

        {/* Courses List */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCourses.map((course) => (
            <div
              key={course._id}
              className="bg-gradient-to-r from-gray-700 to-gray-800 shadow-md rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 ease-in-out hover:bg-gray-700 transform hover:scale-105"
            >
              <h4 className="text-lg font-semibold text-gray-100">{course.title}</h4>
              <div className="space-y-2">
                <progress
                  className="w-full h-4 appearance-none"
                  max="100"
                  value={course.progress}
                ></progress>
                <p className="text-gray-400">Progress: {course.progress}%</p>
              </div>

              {/* Button Container with Flexbox */}
              <div className="flex justify-between space-x-2">
                {/* View Course Button */}
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => router.push(`/course/${course._id}`)}
                >
                  View Course
                </button>

                {/* Buy Button */}
                <button
                  className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition-all duration-300 w-1/2"
                  onClick={() => router.push(`/buy?name=${course.name}&fees=${course.fees}`)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Modal for adding new video */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold mb-4 text-white">Add New Video</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-300">Video Title</label>
                  <input
                    type="text"
                    name="title"
                    className="w-full p-2 border-2 border-gray-600 rounded mt-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Video File</label>
                  <input
                    type="file"
                    name="videoFile"
                    className="w-full p-2 border-2 border-gray-600 rounded mt-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Description</label>
                  <textarea
                    name="description"
                    className="w-full p-2 border-2 border-gray-600 rounded mt-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default CoursesComponent;
