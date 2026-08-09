import React from 'react';
import { profile } from '../../data/profile';
import { stats } from '../../data/stats';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { Code, Layout, Database, Laptop } from 'lucide-react';
import { CountUp } from '../ui/CountUp';

const interests = [
  { icon: Code, title: "Building for the web", desc: "Creating responsive interfaces and learning how frontend and backend systems work together." },
  { icon: Layout, title: "Making interfaces feel good", desc: "I enjoy creating clean, intuitive interfaces where design and functionality work together." },
  { icon: Database, title: "Understanding what's behind the UI", desc: "Working with PHP, Node.js, MySQL, and MongoDB to understand how applications handle data and logic." },
  { icon: Laptop, title: "Projects are my classroom", desc: "I learn best by turning ideas into working projects and solving problems along the way." },
];

export const About = () => {
  return (
    <Section id="about" title="About Me" className="relative">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <Reveal type="slideLeft">
          <h3 className="text-2xl font-bold mb-6 text-foreground tracking-tight">
            Crafting Ideas Into Meaningful <span className="text-primary italic">Solutions</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            I am a Bachelor of Information Management (BIM) student with a growing passion for technology, creativity, and problem-solving. I enjoy exploring how ideas can be transformed into practical digital experiences that are useful, intuitive, and meaningful to people.
          </p>
          <div className="space-y-6 text-muted-foreground mb-10 leading-relaxed">
            <p>
              My journey in technology has been shaped by curiosity and a willingness to learn through experience. I enjoy taking on new challenges, experimenting with different ideas, and understanding not just how something works, but why it works. Every project, mistake, and new concept has helped me become more confident, independent, and thoughtful in the way I approach problems.
            </p>
            <p>
              As I continue my journey in IT, I am focused on strengthening my fundamentals, becoming a better problem solver, exploring modern technologies including AI, and building things that reflect both my technical skills and creativity.
            </p>
          </div>
          
          <a href={profile.resumePath} target="_blank" rel="noopener noreferrer">
            <Button variant="outline">Download Resume</Button>
          </a>
        </Reveal>
        
        <Reveal type="slideLeft" className="flex flex-col gap-10">
          {/* Stats Row */}
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="p-4 glass-panel text-center flex flex-col items-center justify-center"
              >
                <span className="text-2xl md:text-3xl text-primary font-bold block mb-2">
                  <CountUp value={stat.value} delay={0.2 + idx * 0.1} />
                  {stat.suffix}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* What I'm Into Grid */}
          <div>
            <h4 className="text-sm text-primary uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
              What I'm Into
            </h4>
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {interests.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx} 
                    variants={{
                      hidden: { opacity: 0, x: -24 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    className="p-5 glass-panel flex flex-col gap-3 transition-colors hover:border-primary/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground mb-1">{item.title}</h5>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Reveal>

      </div>
    </Section>
  );
};
