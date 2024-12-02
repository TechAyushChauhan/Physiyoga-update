"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Dashboard.css"; // Ensure you add appropriate styles
import { FaUserAlt, FaBook, FaSignOutAlt } from "react-icons/fa"; // Importing icons for a polished look

// Dummy course data
const courses = [
  { id: 1, name: "Yoga for Beginners", progress: 80 },
  { id: 2, name: "Advanced Yoga Poses", progress: 50 },
  { id: 3, name: "Mindfulness and Meditation", progress: 90 },
];

const Dashboard: React.FC = () => {
  const [userCourses, setUserCourses] = useState(courses); // Set user courses
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's course data from the API or local storage (for this demo, using dummy data)
    // Example: setUserCourses(fetchedCourses);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token on logout
    router.push("/login"); // Redirect to the login page after logout
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-item">
          <FaUserAlt />
          <span>Profile</span>
        </div>
        <div className="sidebar-item">
          <FaBook />
          <span>Courses</span>
        </div>
        <div className="sidebar-item" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>

      <div className="main-content">
        <h2>Welcome to Your Yoga Dashboard</h2>
        <p className="text-description">
          Manage your courses, track your progress, and explore new learning opportunities.
        </p>

        <div className="dashboard-courses">
          <h3>Your Courses</h3>
          <div className="course-list">
            {userCourses.map((course) => (
              <div key={course.id} className="course-card">
                <h4>{course.name}</h4>
                <div className="course-progress">
                  <p>Progress: {course.progress}%</p>
                  <progress value={course.progress} max={100}></progress>
                </div>
                <button
                  className="btn-view-course"
                  onClick={() => router.push(`/course/${course.id}`)}
                >
                  View Course
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-cards">
          <div className="stat-card">
            <h4>Total Sessions</h4>
            <p>120</p>
          </div>
          <div className="stat-card">
            <h4>Total Revenue</h4>
            <p>$5000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
