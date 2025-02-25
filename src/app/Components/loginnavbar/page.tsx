
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Menu, Home, BookOpen, Settings, LogOut, User } from 'lucide-react';
import { useAppSelector } from '../../../../lib/hooks';

interface Notification {
  id: string | number;
  message: string;
  timestamp?: string;
  isRead?: boolean;
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
  icon?: React.ReactNode;
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
  const [showmenuadmin, setshowmenuadmin] = useState(false);
  const notificationsPanelRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
 const userid= useAppSelector((state) => state.user);
 console.log(userid,"login data user")
  const adminNavItems: NavItem[] | [] = [
    { path: '/appointmentdata', label: 'Appointment Data', icon: <Settings className="w-4 h-4" /> },
    { path: '/meetingdata', label: 'Course Meeting Data', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/logindata', label: 'Login Data', icon: <User className="w-4 h-4" /> },
    { path: '/videostore', label: 'Video Store', icon: <Settings className="w-4 h-4" /> },
    { path: '/userinfo', label: 'User Info', icon: <User className="w-4 h-4" /> },
    { path: '/addvideo', label: 'Add Video', icon: <Settings className="w-4 h-4" /> },
    { path: '/addcourse', label: 'Add Course', icon: <BookOpen className="w-4 h-4" /> },
    { path: '/dailymeeting', label: 'Daily Yoga Batch', icon: <Settings className="w-4 h-4" /> },
    { path: '/approverejectuser', label: 'Approve Reject User', icon: <User className="w-4 h-4" /> },
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
  useEffect(()=>{
    console.log(userid.mobileOrEmail=="meet",userid.mobileOrEmail)
    if (userid.mobileOrEmail=="meet") {
      setshowmenuadmin(true)
    }

  },[userid])

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

  const NavigationButton = ({ path, label, icon }: NavItem) => (
    <button
      onClick={() => handleNavigation(path)}
      className="group flex items-center space-x-2 w-full px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
    >
      {icon && <span className="group-hover:text-blue-600 transition-colors duration-200">{icon}</span>}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm backdrop-blur-sm bg-white/90">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
                Welcome, {showmenuadmin ? userid.name : 'Guest'}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavigationButton path="/dashboard" label="Dashboard" icon={<Home className="w-4 h-4" />} />
            <NavigationButton path="/courses" label="Courses" icon={<BookOpen className="w-4 h-4" />} />
            
            {/* Admin Dropdown */}
            <div className="relative" ref={adminDropdownRef}>
         {(showmenuadmin) &&    <button
                onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                className="group flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <Settings className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-200" />
                <span className="font-medium">Admin</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAdminDropdown ? 'rotate-180' : ''}`} />
              </button>}
              
              {showAdminDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="py-2">
                    {adminNavItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className="flex items-center space-x-2 w-full px-4 py-2.5 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Section - Notifications & Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative" ref={notificationsPanelRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-50 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <p className="text-sm text-gray-700">{notification.message}</p>
                          {notification.timestamp && (
                            <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1 rounded-full hover:ring-2 hover:ring-blue-100 transition-all duration-200"
              >
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{name.charAt(0)}</span>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <p className="font-semibold text-gray-800">{showmenuadmin?userid.name:"Guest"}</p>
                    {/* <p className="text-sm text-gray-500">Student</p> */}
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-gray-100">
            <div className="p-2 space-y-1">
              <NavigationButton path="/dashboard" label="Dashboard" icon={<Home className="w-4 h-4" />} />
              <NavigationButton path="/courses" label="Courses" icon={<BookOpen className="w-4 h-4" />} />
              
              {/* Mobile Admin Menu */}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <p className="px-4 py-2 text-sm font-medium text-gray-500">Admin Menu</p>
                {adminNavItems.map((item) => (
                  <NavigationButton key={item.path} {...item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;