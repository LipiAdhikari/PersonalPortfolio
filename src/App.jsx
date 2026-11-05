import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { Journey } from './components/sections/Journey';
import { CurrentlyLearning } from './components/sections/CurrentlyLearning';
import { Contact } from './components/sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/layout/Preloader';
import { AnimatedBackground } from './components/layout/AnimatedBackground';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Preloader>
      <div className="bg-background text-foreground min-h-screen font-sans selection:bg-primary/30 selection:text-primary-foreground relative w-full overflow-x-hidden">
        <CustomCursor />
        <AnimatedBackground />

        <div className="relative z-10 w-full overflow-x-hidden">
          <Navbar />
          <main className="w-full overflow-x-hidden">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <CurrentlyLearning number="05" />
            <Contact />
          </main>
          <Footer />
        </div>
        <Analytics />
      </div>
    </Preloader>
  );
}

export default App;
