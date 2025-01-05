
"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import LoginFooter from "../Components/loginfooter/page";
import LoginNavbar from "../Components/loginnavbar/page";
import { FaVideo } from "react-icons/fa";
import CoursesComponent from "../Components/course/page";
import { 
  ChevronLeft, 
  Book, 
  ClipboardList, 
  TrendingUp,
  Video,
  User,
  Activity,
  Menu,
  X
} from 'lucide-react';


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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <div>
    <LoginNavbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar - Desktop */}
      <div className={`
        fixed top-0 left-0 h-screen 
        hidden lg:block
        ${isCollapsed ? 'w-20' : 'w-72'} 
        bg-white dark:bg-slate-800 
        shadow-xl transition-all duration-300 
        border-r border-slate-200 dark:border-slate-700
      `}>
        <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Yoga Dashboard
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button className={`
                  w-full p-3 flex items-center gap-4
                  rounded-lg transition-all duration-200
                  hover:bg-indigo-50 dark:hover:bg-slate-700
                  text-slate-600 dark:text-slate-300
                  hover:text-indigo-600 dark:hover:text-indigo-400
                  group
                `}>
                  <item.icon size={20} className="group-hover:text-indigo-500" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-0 z-50 lg:hidden
        transform transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Mobile Menu Content */}
        <div className="relative w-64 max-w-[80%] h-full bg-white dark:bg-slate-800 shadow-xl">
          <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Yoga Dashboard
            </h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button className={`
                    w-full p-3 flex items-center gap-4
                    rounded-lg transition-all duration-200
                    hover:bg-indigo-50 dark:hover:bg-slate-700
                    text-slate-600 dark:text-slate-300
                    hover:text-indigo-600 dark:hover:text-indigo-400
                    group
                  `}>
                    <item.icon size={20} className="group-hover:text-indigo-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`
        transition-all duration-300 p-4 sm:p-6 lg:p-8
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}
      `}>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Stats Cards */}
          {[
            { icon: Book, label: 'Total Courses', value: '25', change: '+12.5%', color: 'indigo' },
            { icon: ClipboardList, label: 'Completed', value: '12', change: '+8.2%', color: 'green' },
            { icon: TrendingUp, label: 'In Progress', value: '8', change: '+15.3%', color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-${stat.color}-100 dark:bg-${stat.color}-900/50 p-3 rounded-lg`}>
                  <stat.icon className={`text-${stat.color}-600 dark:text-${stat.color}-400`} size={20} />
                </div>
                <span className={`text-sm font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{stat.value}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { color: 'bg-indigo-500', text: 'Completed Meditation Basics' },
                { color: 'bg-green-500', text: 'Achieved 7-day streak' },
                { color: 'bg-purple-500', text: 'Started Advanced Yoga' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-slate-600 dark:text-slate-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: Book, label: 'Browse Courses', color: 'bg-indigo-500 hover:bg-indigo-600' },
                { icon: Video, label: 'Watch Videos', color: 'bg-purple-500 hover:bg-purple-600' },
                { icon: User, label: 'Edit Profile', color: 'bg-green-500 hover:bg-green-600' },
                { icon: Activity, label: 'View Progress', color: 'bg-blue-500 hover:bg-blue-600' }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`
                    ${item.color}
                    p-3 sm:p-4 rounded-lg text-white
                    flex items-center justify-center gap-2
                    transition-colors duration-200
                    shadow-sm hover:shadow-md
                    text-sm sm:text-base
                  `}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Courses Component */}
        <div className="mt-6">
          <CoursesComponent />
        </div>
      </div>
    </div>
    <LoginFooter />
  </div>
);
};

// export default ResponsiveDashboard;
//   );
// };

export default Dashboard;
