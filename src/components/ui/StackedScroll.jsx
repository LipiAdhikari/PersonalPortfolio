import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';

export const StackedScroll = ({ children }) => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const childrenCount = React.Children.count(children);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-col gap-12 w-full">
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${childrenCount * 70}vh` }}>
      <div className="relative w-full h-full">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          
          return (
            <div 
              key={index} 
              className="sticky top-24 md:top-32 w-full flex justify-center"
              style={{ 
                height: '70vh',
                zIndex: index 
              }}
            >
              {React.cloneElement(child, {
                scrollYProgress,
                index,
                total: childrenCount
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StackedCard = ({ children, scrollYProgress, index, total }) => {
  // Call hooks unconditionally. If scrollYProgress is missing (fallback), 
  // we still need to call useTransform to satisfy React's Rules of Hooks.
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress || fallbackProgress; 
  
  const startSlide = index / total;
  const cardsCovering = total - 1 - index;
  
  const targetScale = 1 - (0.04 * cardsCovering);
  const targetY = -25 * cardsCovering; 
  const targetOpacity = Math.max(0.4, 1 - (0.2 * cardsCovering));
  const targetRotate = -1.5 * cardsCovering;

  const scale = useTransform(progress, [startSlide, 1], [1, targetScale]);
  const y = useTransform(progress, [startSlide, 1], [0, targetY]);
  const opacity = useTransform(progress, [startSlide, 1], [1, targetOpacity]);
  const rotateX = useTransform(progress, [startSlide, 1], [0, targetRotate]);

  // If no scrollYProgress (fallback/reduced motion), just render standard
  if (!scrollYProgress) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <motion.div
      className="w-full origin-top"
      style={{
        scale,
        y,
        opacity,
        rotateX,
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="w-full h-full md:max-w-4xl mx-auto shadow-2xl rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
