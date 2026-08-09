import React from 'react';
import { motion } from 'framer-motion';

export const Card = React.forwardRef(({ children, className = '', style, ...props }, ref) => {
  return (
    <motion.div 
      ref={ref}
      className={`glass-panel rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-xl ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
});
