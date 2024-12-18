"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LoginNavbar from "../Components/loginnavbar/page";
import LoginFooter from "../Components/loginfooter/page";
import CoursesComponent from "../Components/course/page";

// Dynamic imports for icons
const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
const FaSignOutAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaSignOutAlt), { ssr: false });
const FaBars = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBars), { ssr: false });
const FaTimes = dynamic(() => import("react-icons/fa").then((mod) => mod.FaTimes), { ssr: false });
const FaBell = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBell), { ssr: false });

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

const Courses: React.FC = () => {
  const [userCourses] = useState(courses);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

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
    <div>
      <LoginNavbar />
      <CoursesComponent />
      <LoginFooter />
    </div>
  );
};

export default Courses;
