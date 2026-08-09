import React from 'react';

export const Badge = ({ children, variant = 'default', className = '', customColor = '' }) => {
  const variants = {
    default: "bg-primary/10 text-primary border border-primary/20",
    learning: "bg-pink-500/10 text-pink-600 border border-pink-500/20",
    outline: "bg-transparent text-primary border border-primary/30 text-[0.7rem] sm:text-xs",
    custom: customColor
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
