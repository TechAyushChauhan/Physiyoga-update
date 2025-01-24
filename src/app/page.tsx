'use client';

import { useState, useEffect } from 'react';
import Footer from './Components/footer/page';
import Navbar from './Components/navbar/page';
import FirstPage from './Pages/HomePages/FirstPage';
import SecondPage from './Pages/HomePages/SecondPage';
import Thirdpage from './Pages/HomePages/ThirdPage';
import FourthPage from './Pages/HomePages/FourthPage';
import FifthPage from './Pages/HomePages/FifthPage';
import SixthPage from './Pages/HomePages/SixthPage';
import SeventhPage from './Pages/SeventhPage';
import LoadingSpinner from './Components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or use real loading logic
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='bg-white'>
              <Navbar />
            </div>

            <FirstPage />
            <SecondPage />
            <Thirdpage />
            <FourthPage />
            <SeventhPage />
            <FifthPage />
            <SixthPage />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Page;