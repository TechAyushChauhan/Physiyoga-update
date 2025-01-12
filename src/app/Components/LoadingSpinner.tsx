// components/LoadingSpinner.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 z-50">
      <motion.div
        animate={{ rotate: 180 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Image
          src="/images/curetribeloader.png"  // Update path according to your public directory
          alt="Loading..."
          width={50}
          height={500}
          priority
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;