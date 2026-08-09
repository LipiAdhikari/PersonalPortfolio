import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';

export const AnimatedBackground = () => {
  const { x, y } = useMouseParallax(50, 20);

  // Different depths for parallax layers
  const x1 = useTransform(x, [-1, 1], [-30, 30]);
  const y1 = useTransform(y, [-1, 1], [-30, 30]);

  const x2 = useTransform(x, [-1, 1], [40, -40]);
  const y2 = useTransform(y, [-1, 1], [40, -40]);

  const x3 = useTransform(x, [-1, 1], [-60, 60]);
  const y3 = useTransform(y, [-1, 1], [-60, 60]);

  const x4 = useTransform(x, [-1, 1], [25, -25]);
  const y4 = useTransform(y, [-1, 1], [25, -25]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Purple Blob */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px] opacity-30 mix-blend-multiply"
        style={{ backgroundColor: 'var(--purple)', x: x1, y: y1 }}
        animate={{
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Pink Blob */}
      <motion.div
        className="absolute top-[40%] right-[-5%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full blur-[80px] opacity-30 mix-blend-multiply"
        style={{ backgroundColor: 'var(--pink)', x: x2, y: y2 }}
        animate={{
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Sky Blob */}
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[80px] opacity-30 mix-blend-multiply"
        style={{ backgroundColor: 'var(--sky)', x: x3, y: y3 }}
        animate={{
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Cyan Blob */}
      <motion.div
        className="absolute top-[20%] left-[40%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] rounded-full blur-[70px] opacity-20 mix-blend-multiply"
        style={{ backgroundColor: '#22d3ee', x: x4, y: y4 }}
        animate={{
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};
