"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Menu } from 'lucide-react';

interface Notification {
  id: string | number;
  message: string;
}

interface HeaderProps {
  isCollapsed?: boolean;
  loggedIn?: boolean;
  name?: string;
  notifications?: Notification[];
  handleLogout?: () => void;
}

interface NavItem {
  path: string;
  label: string;
}

const Header: React.FC<HeaderProps> = ({
  isCollapsed = false,
  loggedIn = false,
  name = 'Guest',
  notifications = [],
  handleLogout = () => console.warn('Logout handler not provided')
}) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const notificationsPanelRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const adminNavItems: NavItem[] = [
    { path: '/appointmentdata', label: 'Appointment Data' },
    { path: '/meetingdata', label: 'Meeting Data' },
    { path: '/logindata', label: 'Login Data' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const refs = [
        { ref: notificationsPanelRef, setter: setShowNotifications },
        { ref: profileMenuRef, setter: setShowProfileMenu },
        { ref: adminDropdownRef, setter: setShowAdminDropdown },
        { ref: mobileMenuRef, setter: setShowMobileMenu }
      ];

      refs.forEach(({ ref, setter }) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setter(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    setShowMobileMenu(false);
    setShowAdminDropdown(false);
    router.push(path);
  };

  const NavigationLinks = () => (
    <>
      <button
        onClick={() => handleNavigation('/dashboard')}
        className="text-gray-600 hover:text-blue-600 w-full text-left px-4 py-2 transition-colors duration-200 ease-in-out rounded-lg hover:bg-gray-50"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavigation('/courses')}
        className="text-gray-600 hover:text-blue-600 w-full text-left px-4 py-2 transition-colors duration-200 ease-in-out rounded-lg hover:bg-gray-50"
      >
        Courses
      </button>
      <div className="relative inline-block" ref={adminDropdownRef}>
        <button
          onClick={() => setShowAdminDropdown(!showAdminDropdown)}
          className="text-gray-600 hover:text-blue-600 w-full text-left px-4 py-2 flex items-center justify-between transition-colors duration-200 ease-in-out rounded-lg group hover:bg-gray-50"
        >
          <span>Admin</span>
          <ChevronDown
            className={`transform transition-transform duration-200 w-4 h-4 group-hover:text-blue-600 ${
              showAdminDropdown ? 'rotate-180' : ''
            }`}
          />
        </button>
        {showAdminDropdown && (
          <div className="absolute left-0 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {adminNavItems.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className="w-full text-left px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="flex bg-white">
      <div
        className={`flex-grow flex flex-col ${
          isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
        } transition-all duration-300 ease-in-out`}
      >
        <header className="bg-white shadow-md p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 z-20 w-full transition-colors duration-200 ease-in-out">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome, {loggedIn ? name : 'Guest'}
            </h1>
            
            <button
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out p-2 rounded-lg hover:bg-gray-50"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div
            ref={mobileMenuRef}
            className={`${
              showMobileMenu ? 'flex' : 'hidden'
            } md:hidden flex-col w-full mt-4 bg-white rounded-lg space-y-1`}
          >
            <NavigationLinks />
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <NavigationLinks />
          </nav>

          <div className={`flex items-center space-x-6 ${showMobileMenu ? 'w-full justify-end mt-4' : 'w-auto'}`}>
            <div className="relative" ref={notificationsPanelRef}>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out rounded-lg hover:bg-gray-50"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Toggle notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="p-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 ease-in-out"
                        >
                          {notification.message}
                        </li>
                      ))
                    ) : (
                      <li className="p-4 text-sm text-gray-500 text-center">
                        No notifications
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative" ref={profileMenuRef}>
              <button
                className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200 ease-in-out"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="Toggle profile menu"
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 text-center">
                    <p className="text-gray-800 font-semibold">
                      {name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Student
                    </p>
                  </div>
                  <ul>
                    <li
                      className="p-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors duration-200 ease-in-out"
                      onClick={() => handleNavigation('/profile')}
                    >
                      Profile
                    </li>
                    <li
                      className="p-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors duration-200 ease-in-out"
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