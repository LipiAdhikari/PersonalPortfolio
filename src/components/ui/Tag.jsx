import React from 'react';

export const Tag = ({ children, className = '' }) => {
  return (
    <span className={`px-3 py-1 rounded-md bg-white/5 text-muted-foreground text-sm border border-white/10 ${className}`}>
      {children}
    </span>
  );
};
