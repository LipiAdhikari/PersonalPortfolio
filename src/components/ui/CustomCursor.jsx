import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [hoverType, setHoverType] = useState('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring for the trailing circle
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Feature detect touch & reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (prefersReducedMotion || isTouchDevice) {
      setIsDisabled(true);
      return;
    }

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button') || e.target.closest('[role="button"]')) {
        setHoverType('button');
      } else if (e.target.closest('a')) {
        setHoverType('link');
      } else {
        setHoverType('default');
      }
    };

    // Make interactive elements inherit cursor: none so we don't see the default pointer pop up
    const style = document.createElement('style');
    style.innerHTML = `
      * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      document.head.removeChild(style);
    };
  }, [mouseX, mouseY]);

  if (isDisabled) return null;

  // Variants for the dot
  const dotVariants = {
    default: { 
      backgroundColor: 'var(--accent)', 
      scale: 1,
      boxShadow: '0 0 10px 2px var(--accent)'
    },
    button: { 
      backgroundColor: 'transparent', 
      scale: 0,
      boxShadow: '0 0 0px 0px transparent'
    },
    link: { 
      backgroundColor: 'var(--sky)', 
      scale: 1.5, 
      boxShadow: '0 0 12px 3px var(--sky)' 
    }
  };

  // Variants for the trailing circle
  const circleVariants = {
    default: { 
      borderColor: 'var(--accent)', 
      scale: 1, 
      backgroundColor: 'transparent',
      opacity: 0.5
    },
    button: { 
      borderColor: 'var(--accent)', 
      scale: 2.2, 
      backgroundColor: 'rgba(139, 108, 240, 0.1)',
      opacity: 1
    },
    link: { 
      borderColor: 'var(--sky)', 
      scale: 1.2, 
      backgroundColor: 'rgba(169, 212, 245, 0.1)',
      opacity: 0.8
    }
  };

  return (
    <>
      {/* Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border-[1.5px] pointer-events-none z-[9999]"
        style={{ x: springX, y: springY }}
        variants={circleVariants}
        animate={hoverType}
        transition={{ duration: 0.2 }}
      />
      
      {/* Leading Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full pointer-events-none z-[9999]"
        style={{ x: mouseX, y: mouseY }}
        variants={dotVariants}
        animate={hoverType}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};
