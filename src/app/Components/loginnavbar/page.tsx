'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { FaBell, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import { decodeToken } from '../../../../lib/decodToken';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { setUser } from '../../../../store/slices/userSlice';
interface UserState {
  name: string | null;
  refid: string | null;
  loggedIn: boolean;
}
const LoginNavbar = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);


    const { name,refid,loggedIn} = useAppSelector((state)=>state.user)
    console.log(name,refid,loggedIn)
  const [notifications] = useState([
    { id: 1, message: 'New message from admin' },
    { id: 2, message: 'Your profile has been updated' },
    { id: 3, message: "Your subscription is expiring soon." },
    { id: 4, message: "Welcome to your Dashboard!" },
  ]);
  const dispatch = useAppDispatch()

  const notificationsPanelRef = useRef(null);
  const profileMenuRef = useRef(null);
  const adminDropdownRef = useRef(null);


  // Close notifications/profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsPanelRef.current &&
        !notificationsPanelRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target)
      ) {
        setShowAdminDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    dispatch(setUser({
      name:  null,
      refid: null,
      loggedIn:false,
     }))
    router.push('/login');
  };


  return (
    <div className="flex bg-cyan-100">
      {/* Main Content Area */}
      <div
        className={`flex-grow flex flex-col ${
          isCollapsed ? 'ml-20' : 'ml-64'
        } transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-3 rounded-xl flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Welcome,{(loggedIn)? name:'Guest'}
            </h1>
            {/* Added Navigation Links */}
            <nav className="flex space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/courses')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
              >
                Courses
              </button>
              <div className="relative inline-block text-left" ref={adminDropdownRef}>
                <button
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md inline-flex items-center"
                >
                  <span>Admin</span>
                  <FaChevronDown
                    className={`ml-2 transform transition-transform duration-200 ${
                      showAdminDropdown ? 'rotate-180' : ''
                    }`}
                    size={12}
                  />
                </button>

                {showAdminDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <button
                        onClick={() => router.push('/appointmentdata')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Appointment Data
                      </button>
                      <button
                        onClick={() => router.push('/meetingdata')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Meeting Data
                      </button>
                      <button
                        onClick={() => router.push('/logindata')}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Login Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationsPanelRef}>
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-10 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-lg border dark:border-gray-600 z-50">
                  <div className="p-4 border-b dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <ul className="divide-y dark:divide-gray-600">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className="p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        {notification.message}
                      </li>
                    ))}
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
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => router.push('/profile')}
                    >
                      Profile
                    </li>
                    <li
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
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

export default LoginNavbar;
