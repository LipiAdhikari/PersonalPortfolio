import React from 'react';
import { Section } from '../layout/Section';
import { exploring } from '../../data/exploring';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { Badge } from '../ui/Badge';

export const CurrentlyLearning = () => {
  const prefersReducedMotion = useReducedMotion();

  if (!exploring || exploring.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <Section id="learning" title="Currently Exploring" className="relative">
      <Reveal type="fade" className="text-center mb-16 relative z-10">
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Learning, experimenting, and keeping up with what's next in technology.
        </p>
      </Reveal>

      {/* Background Decorative Constellation Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-primary/10 to-sky/10 rounded-full blur-3xl animate-pulse" />
        <svg className="absolute w-full h-full max-w-5xl opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,20 L40,30 L60,10 L90,40 L70,80 L30,90 Z" fill="none" stroke="currentColor" className="text-primary" strokeWidth="0.2" strokeDasharray="1 2" />
          <path d="M40,30 L70,80" fill="none" stroke="currentColor" className="text-sky-500" strokeWidth="0.1" strokeDasharray="1 3" />
          <path d="M10,20 L30,90" fill="none" stroke="currentColor" className="text-pink-500" strokeWidth="0.1" strokeDasharray="1 3" />
        </svg>
      </div>

      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {exploring.map((topic, idx) => {
          const Icon = topic.icon;
          
          // Generate a slight random float animation for each card
          const floatY = prefersReducedMotion ? 0 : [0, -8, 0];
          const floatDelay = idx * 0.5;

          return (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group glass-panel p-6 md:p-8 rounded-2xl flex flex-col h-full bg-white/60 backdrop-blur-xl border border-black/5 hover:border-primary/30 transition-colors duration-300 shadow-sm hover:shadow-[0_10px_40px_rgb(0,0,0,0.05)] relative overflow-hidden"
            >
              {/* Subtle gradient glow inside card on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between mb-6 relative z-10">
                <motion.div 
                  animate={{ y: floatY }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-sky-500/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 border border-primary/10 shadow-inner"
                >
                  <Icon size={26} strokeWidth={1.5} />
                </motion.div>
                
                <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-black/5 shadow-sm px-3 py-1 text-xs">
                  {topic.status}
                </Badge>
              </div>
              
              <div className="relative z-10 flex-grow flex flex-col">
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {topic.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                  {topic.description}
                </p>
              </div>
              
              {/* Decorative nodes at bottom to simulate constellation connections */}
              <div className="absolute bottom-4 right-4 flex gap-1 opacity-20 group-hover:opacity-60 transition-opacity duration-300">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <div className="w-1 h-1 rounded-full bg-sky-500" />
                <div className="w-1 h-1 rounded-full bg-pink-500" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};
