
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
  handleLogout
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
    { path: '/logindata', label: 'Login Data' },
    { path: '/videostore', label: 'video store' },
    { path: '/userinfo', label: 'user info' },
    { path: '/addvideo', label: 'Add Video' },
    { path: '/addcourse', label: 'Add Course' },
    { path: '/dailymeeting', label: 'Yoga Batch' },
    { path: '/approverejectuser', label: 'Approve Reject user' },
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

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    if (handleLogout) {
      handleLogout();
    }
    
    router.push('/login');
  };

  const NavigationLinks = () => (
    <>
      <button
        onClick={() => handleNavigation('/dashboard')}
        className="text-gray-700 hover:text-blue-600 w-full text-left px-4 py-3 transition-colors duration-200 ease-in-out hover:bg-blue-50 flex items-center space-x-2 rounded-lg"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavigation('/courses')}
        className="text-gray-700 hover:text-blue-600 w-full text-left px-4 py-3 transition-colors duration-200 ease-in-out hover:bg-blue-50 flex items-center space-x-2 rounded-lg"
      >
        Courses
      </button>
      <div className="relative w-full" ref={adminDropdownRef}>
        <button
          onClick={() => setShowAdminDropdown(!showAdminDropdown)}
          className="text-gray-700 hover:text-blue-600 w-full text-left px-4 py-3 transition-colors duration-200 ease-in-out hover:bg-blue-50 flex items-center justify-between rounded-lg"
        >
          <span>Admin</span>
          <ChevronDown
            className={`transform transition-transform duration-200 w-4 h-4 ${
              showAdminDropdown ? 'rotate-180 text-blue-600' : ''
            }`}
          />
        </button>
        {showAdminDropdown && (
          <div className="md:absolute relative w-full md:w-56 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
            {adminNavItems.map(({ path, label }) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ease-in-out border-b border-gray-50 last:border-0"
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
    <header className="sticky top-0 z-20 w-full bg-white shadow-md">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
                Welcome, {loggedIn ? name : 'Guest'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 md:hidden">
              <button
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out rounded-full hover:bg-blue-50"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Toggle notifications"
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              <button
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out rounded-full hover:bg-blue-50"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`${
              showMobileMenu ? 'flex' : 'hidden'
            } md:hidden flex-col w-full mt-4 bg-white rounded-xl space-y-1 overflow-hidden`}
          >
            <NavigationLinks />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationLinks />
          </nav>

          {/* Desktop Notifications & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={notificationsPanelRef}>
              <button
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 ease-in-out rounded-full hover:bg-blue-50"
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
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <div className="p-3 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h3>
                  </div>
                  <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="p-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 ease-in-out"
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
                className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-blue-100 transition-all duration-200 ease-in-out"
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 text-center bg-gray-50">
                    <p className="text-gray-800 font-semibold">
                      {name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Student
                    </p>
                  </div>
                  <ul>
                    <li
                      className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-in-out border-b border-gray-50"
                      onClick={() => handleNavigation('/profile')}
                    >
                      Profile
                    </li>
                    <li
                      className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-200 ease-in-out"
                      onClick={handleLogoutClick}
                    >
                      Log Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Notifications Panel */}
          {showNotifications && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-50">
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ✕
                  </button>
                </div>
                <ul className="divide-y divide-gray-100">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="p-4 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 ease-in-out"
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;