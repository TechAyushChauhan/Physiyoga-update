"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports for icons
const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
const FaSignOutAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSignOutAlt), { ssr: false });

// Dummy course data
const courses = [
  { id: 1, name: "Yoga for Beginners", progress: 80 },
  { id: 2, name: "Advanced Yoga Poses", progress: 50 },
  { id: 3, name: "Mindfulness and Meditation", progress: 90 },
];

const Dashboard: React.FC = () => {
  const [userCourses, setUserCourses] = useState(courses); // Retaining default courses
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-900 text-white flex flex-col p-6 space-y-6">
        <div className="flex items-center space-x-4 cursor-pointer">
          <FaUserAlt />
          <span>Profile</span>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer">
          <FaBook />
          <span>Courses</span>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8 space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to Your Yoga Dashboard</h2>
        <p className="text-gray-600">
          Manage your courses, track your progress, and explore new learning opportunities.
        </p>

        {/* Courses List */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCourses.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">{course.name}</h4>
              <div className="space-y-2">
                <progress className="w-full" max="100" value={course.progress}></progress>
                <p className="text-gray-600">Progress: {course.progress}%</p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => router.push(`/course/${course.id}`)}
              >
                View Course
              </button>
            </div>
          ))}
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-800">Total Sessions</h4>
            <p className="text-2xl font-bold text-blue-600">120</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-800">Total Revenue</h4>
            <p className="text-2xl font-bold text-blue-600">$5000</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
