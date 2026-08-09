import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(['home', 'about', 'skills', 'projects', 'journey', 'contact'], 100);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setIsHidden(true);
      setMobileMenuOpen(false); // Close mobile menu when scrolling down
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 md:top-6 w-full z-50 flex justify-center px-4 pointer-events-none"
    >
      <motion.div
        animate={{
          paddingTop: isScrolled ? "0.5rem" : "0.875rem",
          paddingBottom: isScrolled ? "0.5rem" : "0.875rem",
          paddingLeft: isScrolled ? "1.25rem" : "1.5rem",
          paddingRight: isScrolled ? "1.25rem" : "1.5rem"
        }}
        transition={{ duration: 0.3 }}
        className={`glass-panel pointer-events-auto rounded-full flex items-center justify-between w-full max-w-3xl transition-shadow ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
      >
        <a href="#home" className="text-xl font-bold tracking-tighter hover:text-primary transition-colors flex-shrink-0" data-interactive="true">
          Lipi Adhikari
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-auto">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                data-interactive="true"
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-foreground ml-auto p-1 relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          data-interactive="true"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute md:hidden glass-panel w-[calc(100%-2rem)] max-w-sm right-4 top-[120%] pointer-events-auto rounded-2xl shadow-xl overflow-hidden origin-top-right"
          >
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    data-interactive="true"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors px-6 py-4 hover:bg-white/20 relative ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobile-nav-active"
                        className="absolute inset-0 bg-white/10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
