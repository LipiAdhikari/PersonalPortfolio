import React from 'react';
import { motion } from 'framer-motion';
import { useMagneticHover } from '../../hooks/useMagneticHover';

export const Button = ({ children, variant = 'primary', size = 'default', className = '', ...props }) => {
  const { ref, x, y } = useMagneticHover(15, 100);

  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none relative z-10";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "glass-panel text-foreground hover:bg-white/40",
    outline: "border border-primary bg-transparent hover:bg-primary/5 text-primary",
    ghost: "bg-transparent hover:bg-primary/5 text-primary"
  };
  
  const sizes = {
    sm: "h-9 px-5 text-sm",
    default: "h-11 px-8 text-base",
    lg: "h-14 px-10 text-lg"
  };

  return (
    <motion.button 
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{ x, y }}
      data-interactive="true"
      {...props}
    >
      {children}
    </motion.button>
  );
};
