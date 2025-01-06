"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaBell, FaChevronDown, FaBars } from 'react-icons/fa';

const Header = ({ 
  isCollapsed = false, 
  loggedIn = false, 
  name = 'Guest', 
  notifications = [], // Provide default empty array
  router = {
    push: (path) => console.warn('Router not provided, navigation disabled')
  },
  handleLogout = () => console.warn('Logout handler not provided')
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const notificationsPanelRef = useRef(null);
  const profileMenuRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsPanelRef.current && !notificationsPanelRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (adminDropdownRef.current && !adminDropdownRef.current.contains(event.target)) {
        setShowAdminDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavigationLinks = () => (
    <>
      <button
        onClick={() => router.push('/dashboard')}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 w-full text-left px-4 py-2"
      >
        Dashboard
      </button>
      <button
        onClick={() => router.push('/courses')}
        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 w-full text-left px-4 py-2"
      >
        Courses
      </button>
      <div className="relative">
        <button
          onClick={() => setShowAdminDropdown(!showAdminDropdown)}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 w-full text-left px-4 py-2 flex items-center justify-between"
        >
          <span>Admin</span>
          <FaChevronDown
            className={`transform transition-transform duration-200 ${
              showAdminDropdown ? 'rotate-180' : ''
            }`}
            size={12}
          />
        </button>
        {showAdminDropdown && (
          <div className="bg-gray-50 dark:bg-gray-700 w-full">
            <button
              onClick={() => router.push('/appointmentdata')}
              className="w-full text-left px-6 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Appointment Data
            </button>
            <button
              onClick={() => router.push('/meetingdata')}
              className="w-full text-left px-6 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Meeting Data
            </button>
            <button
              onClick={() => router.push('/logindata')}
              className="w-full text-left px-6 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Login Data
            </button>
          </div>
        )}
      </div>
    </>
  );

  // Safely check notifications
  const notificationCount = Array.isArray(notifications) ? notifications.length : 0;

  return (
    <div className="flex bg-gray-800">
      <div
        className={`flex-grow flex flex-col ${
          isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
        } transition-all duration-300 ease-in-out`}
      >
        <header className="bg-white dark:bg-gray-800 shadow-md p-3 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 z-20 w-full">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Welcome, {loggedIn ? name : 'Guest'}
            </h1>
            
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 dark:text-gray-300"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <FaBars size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`${
              showMobileMenu ? 'flex' : 'hidden'
            } md:hidden flex-col w-full mt-4 bg-white dark:bg-gray-800 rounded-lg`}
          >
            <NavigationLinks />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <NavigationLinks />
          </nav>

          {/* Right Side Icons */}
          <div className={`flex items-center space-x-4 ${showMobileMenu ? 'w-full justify-end mt-4' : 'w-auto'}`}>
            {/* Notifications */}
            <div className="relative" ref={notificationsPanelRef}>
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-50">
                  <div className="p-4 border-b dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <ul className="divide-y dark:divide-gray-600 max-h-96 overflow-y-auto">
                    {Array.isArray(notifications) && notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="p-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        {notification.message}
                      </li>
                    ))}
                    {(!Array.isArray(notifications) || notifications.length === 0) && (
                      <li className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                className="flex items-center space-x-2"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <Image
                  src="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-50">
                  <div className="p-4 border-b dark:border-gray-600 text-center">
                    <p className="text-gray-800 dark:text-white font-semibold">
                      {name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Student
                    </p>
                  </div>
                  <ul>
                    <li
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-700 dark:text-gray-300"
                      onClick={() => router.push('/profile')}
                    >
                      Profile
                    </li>
                    <li
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-gray-700 dark:text-gray-300"
                      onClick={handleLogout}
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;