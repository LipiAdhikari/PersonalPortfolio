import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const useMagneticHover = (strength = 10, distance = 80) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    
    if (prefersReducedMotion || !isPointerFine) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      const dist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (dist < distance) {
        rawX.set((distanceX / distance) * strength);
        rawY.set((distanceY / distance) * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const element = ref.current;
    if (element) {
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [strength, distance, prefersReducedMotion, rawX, rawY]);

  return { ref, x, y };
};
