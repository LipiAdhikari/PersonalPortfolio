import React from 'react';
import { Reveal } from '../ui/Reveal';

export const Section = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
      {title && (
        <Reveal className="mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </Reveal>
      )}
      {children}
    </section>
  );
};

