
"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LoginFooter from "../Components/loginfooter/page";
import LoginNavbar from "../Components/loginnavbar/page";
import { FaVideo } from "react-icons/fa";
import CoursesComponent from "../Components/course/page";

// Dynamic imports for icons
const FaClipboardList = dynamic(() => import("react-icons/fa").then((mod) => mod.FaClipboardList), { ssr: false });

const Dashboard: React.FC = () => {

  const notificationsPanelRef = useRef<HTMLDivElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const FaChartLine = dynamic(() => import("react-icons/fa").then((mod) => mod.FaChartLine), { ssr: false });
  const FaBook = dynamic(() => import("react-icons/fa").then((mod) => mod.FaBook), { ssr: false });
  const FaUserAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaUserAlt), { ssr: false });
  const FaCog = dynamic(() => import("react-icons/fa").then((mod) => mod.FaCog), { ssr: false });
  const FaCalendarAlt = dynamic(() => import("react-icons/fa").then((mod) => mod.FaCalendarAlt), { ssr: false });
  const FaChalkboardTeacher = dynamic(() => import("react-icons/fa").then((mod) => mod.FaChalkboardTeacher), { ssr: false });
  
  const router = useRouter();
  const pathname = usePathname();
  
  // Initialize isCollapsed from localStorage or default to false
  const [isCollapsed, setIsCollapsed] = useState<boolean | null>(null);

useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    setIsCollapsed(saved ? JSON.parse(saved) : false);
  
}, []);


  const menuItems = [
    { 
      icon: FaChartLine, 
      label: "Dashboard", 
      route: "/dashboard" 
    },
    { 
      icon: FaBook, 
      label: "Courses", 
      route: "/courses" 
    },
    { 
      icon: FaUserAlt, 
      label: "Profile", 
      route: "/profile" 
    },
    { 
      icon: FaCalendarAlt, 
      label: "Appointment", 
      route: "/appointment" 
    },
    { 
      icon: FaChalkboardTeacher, 
      label: "Instructors", 
      route: "/instructors" 
    },
    { 
      icon: FaCog, 
      label: "Settings", 
      route: "/settings" 
    }
  ];

  // Update localStorage when sidebar state changes
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
    }
  };


  return (
    <div className=" min-h-screen bg-gray-50 dark:bg-gray-900">
      <LoginNavbar />
      {/* Sidebar */}
      <div 
        className={`
          ${isCollapsed ? 'w-20' : 'w-64'} 
          bg-white dark:bg-gray-800 
          shadow-lg 
          h-screen 
          fixed 
          left-0 
          top-0 
          z-30
          transition-all 
          duration-300 
          ease-in-out
        `}
      >
        {/* Sidebar Header */}
        <div className={`
          p-4 
          border-b 
          dark:border-gray-700 
          flex 
          items-center 
          justify-between
        `}>
          {!isCollapsed && (
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Yoga Dashboard
            </h2>
          )}
          <button 
            onClick={toggleSidebar}
            className="
              text-gray-600 
              dark:text-gray-300 
              hover:bg-gray-100 
              dark:hover:bg-gray-700 
              p-2 
              rounded-full 
              transition
            "
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2 mt-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li 
                key={item.route}
                className={`
                  flex 
                  items-center 
                  space-x-3 
                  p-3 
                  rounded-lg 
                  cursor-pointer 
                  transition 
                  duration-200
                  ${pathname === item.route 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
                onClick={() => router.push(item.route)}
                title={item.label}
              >
                <item.icon 
                  className={`
                    text-gray-600 
                    dark:text-gray-300
                    ${pathname === item.route 
                      ? 'text-blue-600' 
                      : ''}
                    ${isCollapsed ? 'mx-auto' : ''}
                  `} 
                />
                {!isCollapsed && (
                  <span 
                    className={`
                      text-gray-700 
                      dark:text-gray-300
                      ${pathname === item.route 
                        ? 'text-blue-600 font-semibold' 
                        : ''}
                    `}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area with proper margin */}
      <div 
        className={`
          flex-grow 
          flex 
          flex-col 
          ${isCollapsed ? 'ml-20' : 'ml-64'}
          transition-all 
          duration-300 
          ease-in-out
        `}
      >

        {/* Main Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Overview Widgets */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Courses</h3>
                <FaBook className="text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Courses</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Completed</h3>
                <FaClipboardList className="text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">3</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Courses Finished</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">In Progress</h3>
                <FaChartLine className="text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ongoing Courses</p>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Activity</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Completed React Basics course</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Enrolled in Advanced JavaScript</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Profile information updated</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border dark:border-gray-700">
  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Actions</h3>
  <div className="grid grid-cols-3 gap-4">
    <button 
      onClick={() => router.push("/courses")}
      className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2"
    >
      <FaBook />
      <span>View Courses</span>
    </button>
    <button 
      onClick={() => router.push("/profile")}
      className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
    >
      <FaUserAlt />
      <span>Edit Profile</span>
    </button>
    <button 
      onClick={() => router.push("/addvideo")}
      className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition flex items-center justify-center space-x-2"
    >
      <FaVideo />
      <span>View Videos</span>
    </button>
  </div>
</div>

          </section>
        </main>

       
      </div>    
      <CoursesComponent />
      <LoginFooter />

    </div>
  );
};

export default Dashboard;
