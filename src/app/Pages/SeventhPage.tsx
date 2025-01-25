import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Book, 
  Clock, 
  Users, 
  Signal, 
  VideoIcon, 
  FileText, 
  Award, 
  ChevronRight 
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  lectures: number;
  category: string;
  price: number;
  discountPrice?: number;
  icon: React.ElementType;
  bgColor: string;
}

const SeventhPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const router = useRouter();
  const handleBookAppointment = () => {
    router.push('/login');
  };

  const courses: Course[] = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Master full-stack web development from scratch with modern technologies.",
      duration: "6 months",
      level: "Beginner to Advanced",
      lectures: 150,
      category: "Web Development",
      price: 999,
      discountPrice: 499,
      icon: Book,
      bgColor: "from-blue-100 to-blue-200"
    },
    {
      id: 2,
      title: "Advanced React & Next.js Masterclass",
      description: "Deep dive into modern React ecosystem with server-side rendering techniques.",
      duration: "3 months",
      level: "Intermediate",
      lectures: 80,
      category: "Frontend",
      price: 799,
      discountPrice: 399,
      icon: Signal,
      bgColor: "from-green-100 to-green-200"
    },
    {
      id: 3,
      title: "AI & Machine Learning Fundamentals",
      description: "Comprehensive introduction to AI, machine learning, and deep learning.",
      duration: "4 months",
      level: "All Levels",
      lectures: 120,
      category: "AI/ML",
      price: 1299,
      discountPrice: 649,
      icon: Award,
      bgColor: "from-purple-100 to-purple-200"
    },
    {
      id: 4,
      title: "Cybersecurity Professional Track",
      description: "Become a certified cybersecurity expert with hands-on training.",
      duration: "5 months",
      level: "Advanced",
      lectures: 100,
      category: "Cybersecurity",
      price: 1499,
      discountPrice: 749,
      icon: FileText,
      bgColor: "from-red-100 to-red-200"
    }
  ];

  const categories = [...new Set(courses.map(course => course.category))];

  const filteredCourses = activeCategory 
    ? courses.filter(course => course.category === activeCategory)
    : courses;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const courseVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" id="services">
      {/* Animated Background Blobs */}
      <motion.div 
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-100/40 to-emerald-100/40 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          translateX: [0, 50, -50, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Unlock Your Potential
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Transform your career with our expertly crafted courses. Learn from industry professionals and gain cutting-edge skills.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button 
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === null 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
            }`}
          >
            All Courses
          </button>
          {categories.map((category) => (
            <button 
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={courseVariants}
              className="group"
            >
              <div className={`bg-gradient-to-br ${course.bgColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-3`}>
                <div className="flex justify-between items-center mb-4">
                  <course.icon className="w-10 h-10 text-emerald-700" />
                  <div className="text-sm font-semibold bg-white/80 px-3 py-1 rounded-full text-emerald-700">
                    {course.level}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <VideoIcon className="w-4 h-4 text-emerald-600" />
                    {course.lectures} Lectures
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    {course.category}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    {course.discountPrice && (
                      <div className="flex items-center gap-2">
                        <span className="line-through text-gray-400">${course.price}</span>
                        <span className="font-bold text-emerald-600">${course.discountPrice}</span>
                      </div>
                    )}
                    {!course.discountPrice && (
                      <span className="font-bold text-emerald-600">${course.price}</span>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 transition-colors"
                    onClick={handleBookAppointment}
                  >
                    Enroll Now
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SeventhPage;