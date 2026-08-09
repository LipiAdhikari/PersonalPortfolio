import React, { useEffect, useRef } from 'react';
import { Section } from '../layout/Section';
import { skills } from '../../data/skills';
import { proficiency } from '../../data/proficiency';
import { Badge } from '../ui/Badge';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { useMouseParallax } from '../../hooks/useMouseParallax';


const floatingIcons = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', classes: 'top-[15%] left-[5%] md:left-[10%]', w: 'w-12 md:w-16 h-12 md:h-16', duration: 4 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', classes: 'top-[20%] right-[10%] md:right-[15%]', w: 'w-10 md:w-14 h-10 md:h-14', duration: 5 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', classes: 'bottom-[25%] left-[5%] md:left-[15%]', w: 'w-14 md:w-20 h-14 md:h-20', duration: 4.5 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', classes: 'top-[50%] right-[5%] md:right-[10%]', w: 'w-12 md:w-16 h-12 md:h-16', duration: 6 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', classes: 'bottom-[15%] right-[15%] md:right-[25%]', w: 'w-12 md:w-16 h-12 md:h-16', duration: 5.5 },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', classes: 'top-[40%] left-[8%] md:left-[12%]', w: 'w-10 md:w-14 h-10 md:h-14', duration: 4.8 }
];

export const Skills = () => {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = useMouseParallax(60, 30);
  const iconsX = useTransform(x, [-1, 1], [30, -30]);
  const iconsY = useTransform(y, [-1, 1], [30, -30]);

  return (
    <Section id="skills" title="Skills & Tools" className="bg-transparent relative">
      {/* Floating Icons Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="w-full h-full"
          style={{ x: iconsX, y: iconsY }}
        >
          {floatingIcons.map((item, index) => (
            <motion.div
              key={index}
              className={`absolute ${item.classes} opacity-20 md:opacity-30 drop-shadow-lg flex items-center justify-center`}
              animate={prefersReducedMotion ? {} : {
                y: [0, -20, 0],
                opacity: [0.1, 0.4, 0.1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4
              }}
            >
              <img 
                src={item.src} 
                className={`${item.w} ${item.invert ? 'filter invert brightness-0 opacity-80' : ''}`} 
                alt="Tech Icon" 
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-3 gap-8 mb-16 relative z-10"
      >
        
        {Object.entries(skills).map(([category, items], idx) => {
          // Assign different colors based on category index
          const colors = [
            { borderHover: 'hover:border-primary/50 hover:shadow-[0_0_30px_rgba(139,108,240,0.15)]', badge: 'bg-primary/10 text-primary border-primary/20' },
            { borderHover: 'hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]', badge: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
            { borderHover: 'hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]', badge: 'bg-sky-500/10 text-sky-600 border-sky-500/20' }
          ];
          const colorTheme = colors[idx % colors.length];

          return (
            <motion.div 
              key={category}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className={`glass-panel rounded-3xl p-6 border border-black/10 transition-all duration-500 ease-out hover:-translate-y-2 ${colorTheme.borderHover}`}
            >
              <h3 className="text-xl font-bold mb-6 capitalize text-foreground border-b border-black/5 pb-4">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map(skill => {
                  const isLearning = category === 'backendAndFrameworks' && skill.name.includes('LearningPlaceholder'); // Adjust if needed
                  return (
                    <Badge key={skill.name} variant="custom" customColor={`flex items-center border ${colorTheme.badge} transition-colors hover:bg-white hover:border-transparent`}>
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className={`w-4 h-4 mr-1.5 object-contain ${skill.invertDark ? 'dark:invert' : ''}`} 
                        loading="lazy"
                      />
                      {skill.name} {isLearning && ' (Learning)'}
                    </Badge>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

      </motion.div>


    </Section>
  );
};
