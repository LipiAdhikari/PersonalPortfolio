import React, { useRef, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { timeline } from '../../data/timeline';
import { Badge } from '../ui/Badge';
import { motion, useScroll, useReducedMotion } from 'framer-motion';

export const Journey = () => {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <Section id="journey" title="Journey">
      <div className="max-w-3xl mx-auto relative" ref={containerRef}>
        {/* Background Static Line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-px bg-black/5 md:left-1/2 md:-translate-x-1/2 origin-top"></div>
        
        {/* Animated Growing Line */}
        <motion.div 
          className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-primary md:left-1/2 md:-translate-x-1/2 origin-top"
          style={{ scaleY: prefersReducedMotion ? 1 : scrollYProgress }}
        />
        
        <div className="space-y-12 relative z-10 pt-4">
          {timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;
            // On desktop: isEven means card is on the left (slides from left). !isEven means card is on right (slides from right)
            // On mobile: everything slides from bottom (y) to avoid horizontal scrollbar issues.
            const xOffset = isMobile ? 0 : (isEven ? -50 : 50);
            const yOffset = isMobile ? 24 : 0;

            return (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    x: prefersReducedMotion ? 0 : xOffset,
                    y: prefersReducedMotion ? 0 : yOffset 
                  },
                  visible: { 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
                  }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col md:flex-row gap-6 md:gap-0 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot (Animated Milestone) */}
                <motion.div 
                  variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.2 } }
                  }}
                  className={`absolute left-[11px] md:left-1/2 md:-translate-x-[4.5px] w-[9px] h-[9px] rounded-full mt-6 outline outline-4 outline-background z-20 ${
                    item.highlighted ? 'bg-primary shadow-[0_0_12px_rgba(139,108,240,0.8)] scale-125' : 'bg-primary'
                  }`}
                />
                
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  isEven ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className={`p-6 rounded-2xl border relative hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ease-out ${
                    item.highlighted 
                      ? 'bg-gradient-to-br from-primary/10 via-white/40 to-sky/10 border-primary/30 shadow-lg shadow-primary/5' 
                      : 'bg-white/40 border-black/5 hover:border-primary/20 backdrop-blur-sm'
                  } ${
                    isEven ? 'md:text-right' : 'md:text-left'
                  }`}>
                    <span className="text-primary font-medium text-sm mb-2 block">{item.period}</span>
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                    <h4 className="text-md text-muted-foreground mb-4">{item.org}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                      {item.tags.map(tag => (
                        <Badge key={tag} variant="outline" className={`bg-white/60 text-xs px-2.5 py-0.5 ${item.highlighted ? 'border-primary/20 text-primary' : 'border-black/5 text-muted-foreground'}`}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
