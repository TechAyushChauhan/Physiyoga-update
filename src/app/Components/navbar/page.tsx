
'use client';

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  BookOpen, 
  MessageCircle, 
  Award, 
  LogIn 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navigation items with icons
  const navItems = [
    { 
      name: "Home", 
      href: "/", 
      icon: Home 
    },
    { 
      name: "Services", 
      href: "#services", 
      icon: Users 
    },
    { 
      name: "Courses", 
      href: "/courses", 
      icon: BookOpen 
    },
    { 
      name: "Reviews", 
      href: "#reviews", 
      icon: MessageCircle 
    },
    { 
      name: "Doctors", 
      href: "#doctors", 
      icon: Award 
    }
  ];

  // Handle scroll effect with debounce
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      // Scrolling down
      if (currentScrollY > 100) {
        setIsVisible(false);
      }
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    // Update last scroll position
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Mobile menu variants
  const navVariants = {
    hidden: { 
      opacity: 0, 
      y: "-100%",
      transition: {
        type: "tween",
        duration: 0.3
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "tween",
        duration: 0.3
      }
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      x: "100%",
      transition: {
        type: "tween"
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "tween",
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.nav 
      variants={navVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${lastScrollY > 50 ? 'bg-black/90 shadow-md backdrop-blur-md' : 'bg-transparent'}
      `}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src="/images/curetribelogofull.png" 
              alt="Logo" 
              width={150} 
              height={50} 
              className="object-contain"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="group flex items-center space-x-2 text-gray-100 hover:text-emerald-600 transition-colors"
            >
              <item.icon 
                className="w-5 h-5 text-gray-500 group-hover:text-emerald-500 transition-colors" 
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-emerald-600 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-emerald-500 p-2 rounded-full focus:outline-none"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-40 md:hidden"
          >
            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 bg-emerald-500 text-white p-2 rounded-full z-50"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="container mx-auto px-4 py-16 space-y-6">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  variants={menuItemVariants}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-4 py-3 px-4 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
                    <item.icon className="w-6 h-6 text-emerald-500" />
                    <span className="text-xl font-semibold text-gray-800">{item.name}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                variants={menuItemVariants}
                className="pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-emerald-500 text-white py-3 rounded-full flex items-center justify-center space-x-3 text-lg"
                >
                  <LogIn className="w-6 h-6" />
                  <span>Login</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;