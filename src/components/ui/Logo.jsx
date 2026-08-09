import React from 'react';
import { motion } from 'framer-motion';

export const Logo = ({ size = 40, animate = false, className = '' }) => {
  const octagonVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 0.4, ease: "easeInOut" } 
    }
  };

  const lVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 0.3, delay: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle or container if needed, but keeping it minimal for now */}
      {animate ? (
        <>
          <motion.path
            d="M 31 5 L 69 5 L 95 31 L 95 69 L 69 95 L 31 95 L 5 69 L 5 31 Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={octagonVariants}
            initial="hidden"
            animate="visible"
          />
          <motion.path
            d="M 30 25 L 30 75 L 70 75"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={lVariants}
            initial="hidden"
            animate="visible"
          />
        </>
      ) : (
        <>
          <path
            d="M 31 5 L 69 5 L 95 31 L 95 69 L 69 95 L 31 95 L 5 69 L 5 31 Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 30 25 L 30 75 L 70 75"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};
