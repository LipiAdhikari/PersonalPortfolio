import React, { useEffect, useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../ui/Logo';

export const PreloaderContext = createContext({ isFinished: true });

export const usePreloader = () => useContext(PreloaderContext);

export const Preloader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderContent, setShouldRenderContent] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsLoading(false);
      setShouldRenderContent(true);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 800);
    const t3 = setTimeout(() => setStep(3), 1300);
    const t4 = setTimeout(() => setStep(4), 2000);
    const t5 = setTimeout(() => setIsLoading(false), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const textVariants = {
    initial: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 1.05, filter: "blur(4px)", transition: { duration: 0.2 } }
  };

  return (
    <PreloaderContext.Provider value={{ isFinished: shouldRenderContent }}>
      <AnimatePresence onExitComplete={() => setShouldRenderContent(true)}>
        {isLoading && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] h-[100dvh] w-full flex items-center justify-center bg-background/95 backdrop-blur-md"
          >
            <div className="relative flex items-center justify-center w-full h-full text-4xl md:text-5xl font-bold tracking-tighter">
              <AnimatePresence>
                {step === 0 && <motion.span key="0" className="absolute bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500" variants={textVariants} initial="initial" animate="animate" exit="exit">L</motion.span>}
                {step === 1 && <motion.span key="1" className="absolute bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500" variants={textVariants} initial="initial" animate="animate" exit="exit">LI</motion.span>}
                {step === 2 && <motion.span key="2" className="absolute bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500" variants={textVariants} initial="initial" animate="animate" exit="exit">LIPI</motion.span>}
                {step === 3 && (
                  <motion.div key="3" className="absolute flex items-center gap-4" variants={textVariants} initial="initial" animate="animate" exit="exit">
                    <span className="text-primary text-3xl md:text-4xl animate-pulse">✦</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">Lipi Adhikari</span>
                    <span className="text-pink-500 text-3xl md:text-4xl animate-pulse">✦</span>
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div key="4" className="absolute" variants={textVariants} initial="initial" animate="animate" exit="exit">
                    <Logo size={80} animate={true} className="text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* We mount the children immediately, but keep them invisible and un-clickable 
          until the preloader is fully gone. This fixes the CLS problem because the browser
          can fetch images and compute layout in the background. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: shouldRenderContent ? 1 : 0, 
          scale: shouldRenderContent ? 1 : 0.95 
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: shouldRenderContent ? 'auto' : 'none' }}
        className="w-full overflow-x-hidden"
      >
        {children}
      </motion.div>
    </PreloaderContext.Provider>
  );
};
