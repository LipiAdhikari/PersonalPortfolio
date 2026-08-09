import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from 'framer-motion';

export const CountUp = ({ value, delay = 0.2, duration = 1.2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (inView) {
      if (prefersReducedMotion) {
        count.set(value);
      } else {
        const controls = animate(count, value, { duration, delay, ease: "easeOut" });
        return controls.stop;
      }
    }
  }, [inView, value, delay, duration, count, prefersReducedMotion]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};
