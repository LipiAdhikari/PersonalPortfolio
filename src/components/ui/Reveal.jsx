import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '../layout/Preloader';

export const Reveal = ({ children, delay = 0, y = 24, once = true, amount = 0.2, className = '', type = 'up' }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const { isFinished } = usePreloader();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShouldAnimate(false);
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    up: { hidden: { opacity: 0, y: y }, visible: { opacity: 1, y: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
    slideLeft: { 
      hidden: { opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? y : 0 }, 
      visible: { opacity: 1, x: 0, y: 0 } 
    },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
    grow: { hidden: { opacity: 0, scaleY: 0, transformOrigin: 'top' }, visible: { opacity: 1, scaleY: 1 } },
    blur: { hidden: { opacity: 0, filter: "blur(10px)" }, visible: { opacity: 1, filter: "blur(0px)" } },
  };

  const selectedVariant = variants[type] || variants.up;

  return (
    <motion.div
      variants={selectedVariant}
      initial="hidden"
      whileInView={isFinished ? "visible" : "hidden"}
      viewport={{ once, amount }}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
