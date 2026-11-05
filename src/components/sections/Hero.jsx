import React, { useState } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { usePreloader } from '../layout/Preloader';

const phrases = [
  "A BIM 5th Sem Student",
  "Frontend Developer",
  "Full-Stack Developer in Progress",
  "Tech Enthusiast"
];

export const Hero = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [startTypewriter, setStartTypewriter] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const nameChars = profile.name.split('');
  const { isFinished } = usePreloader();

  const { x, y } = useMouseParallax(120, 25);
  const imgX = useTransform(x, [-1, 1], [-20, 20]);
  const imgY = useTransform(y, [-1, 1], [-20, 20]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Typewriter effect
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setText(phrases[0]);
      return;
    }

    if (!startTypewriter) return;

    const currentString = phrases[currentPhrase];
    
    let timer;
    if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentString.substring(0, text.length - 1));
      }, 50); // Deleting speed
    } else {
      timer = setTimeout(() => {
        setText(currentString.substring(0, text.length + 1));
      }, 100); // Typing speed
    }

    if (!isDeleting && text === currentString) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, startTypewriter, prefersReducedMotion]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-20 pb-12 overflow-hidden">
      


      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
        <div className="max-w-2xl flex-1">
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: isFinished ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary font-medium tracking-wider uppercase mb-4"
            >
              HELLO, I'M
            </motion.p>
            
            <motion.h1 
              initial="hidden"
              animate={isFinished ? "visible" : "hidden"}
              variants={containerVariants}
              onAnimationComplete={() => setStartTypewriter(true)}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 flex flex-wrap"
            >
              {nameChars.map((char, i) => (
                <motion.span key={i} variants={charVariants}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={startTypewriter && isFinished ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-4xl font-medium text-muted-foreground mb-4 leading-tight min-h-10 md:h-12 flex items-center flex-wrap">
                <span className="text-foreground">{text}</span>
                <span className="w-1 h-6 sm:h-8 md:h-10 ml-1 bg-primary animate-pulse inline-block" />
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
                {profile.bio}
              </p>
            </motion.div>
          </div>
          
          <Reveal type="fade" delay={0.2}>
            <div className="flex flex-wrap gap-4 mt-12">
              <a href="#projects">
                <Button size="lg">View Projects</Button>
              </a>
              <a href={profile.resumePath} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">Download Resume</Button>
              </a>
              <a href="#contact">
                <Button variant="ghost" size="lg">Contact Me</Button>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal type="fade" delay={0.3} className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 mx-auto mt-12 md:mt-0">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full h-full aspect-square"
            style={{ x: imgX, y: imgY }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-sky rounded-full blur-2xl opacity-20 animate-pulse" />
            <div className="relative w-full h-full rounded-full p-2 glass-panel flex items-center justify-center">
              <img 
                src="/lipi-adhikari.png" 
                alt={profile.name} 
                width="320"
                height="320"
                className="w-full h-full object-cover object-[50%_20%] scale-110 rounded-full shadow-[0_0_40px_rgba(139,108,240,0.15)]"
              />
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-4 right-4 glass-panel px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 shadow-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">Open to work</span>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};
