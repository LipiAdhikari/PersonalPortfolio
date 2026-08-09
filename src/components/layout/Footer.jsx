import React from 'react';
import { profile } from '../../data/profile';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/icons';
import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-primary/10 blur-[120px] -z-10 pointer-events-none" />
      
      {/* Glass Container */}
      <div className="glass-panel border-x-0 border-b-0 border-t border-black/5 py-8 rounded-none relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center gap-6 relative z-10">
          
          <Reveal type="fade" className="text-center flex flex-col items-center">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500 mb-2">
              {profile.name}
            </h3>
            <p className="text-muted-foreground text-sm font-medium mb-6 max-w-sm text-center">
              BIM Student • Developer • Builder • Curious Mind
            </p>
            <div className="flex justify-center gap-4">
              <motion.a 
                href={profile.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/50 rounded-full border border-black/5 text-foreground hover:text-primary hover:border-primary/30 transition-colors"
                whileHover={{ y: -3, scale: 1.1, boxShadow: "0px 5px 15px rgba(139,108,240,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon size={18} />
              </motion.a>
              <motion.a 
                href={profile.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-white/50 rounded-full border border-black/5 text-foreground hover:text-primary hover:border-primary/30 transition-colors"
                whileHover={{ y: -3, scale: 1.1, boxShadow: "0px 5px 15px rgba(139,108,240,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedinIcon size={18} />
              </motion.a>
              <motion.a 
                href={`mailto:${profile.email}`} 
                className="p-2.5 bg-white/50 rounded-full border border-black/5 text-foreground hover:text-primary hover:border-primary/30 transition-colors"
                whileHover={{ y: -3, scale: 1.1, boxShadow: "0px 5px 15px rgba(139,108,240,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </Reveal>
          
          <Reveal type="fade" delay={0.2} className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={scrollToTop}
              className="p-3 bg-primary text-white rounded-full shadow-lg shadow-primary/20 flex items-center justify-center group"
              whileHover={{ y: -5, scale: 1.1, boxShadow: "0px 10px 25px rgba(139,108,240,0.4)" }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          </Reveal>

        </div>
        
        <Reveal type="fade" delay={0.4} className="max-w-7xl mx-auto px-6 md:px-12 mt-6 pt-6 border-t border-black/5 flex justify-center items-center">
          <p className="text-xs text-muted-foreground font-medium text-center">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  );
};
