import React from 'react';
import { Section } from '../layout/Section';
import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { Reveal } from '../ui/Reveal';

export const Projects = () => {
  // Combine projects to put featured first
  const allProjects = [
    ...projects.filter(p => p.featured),
    ...projects.filter(p => !p.featured)
  ];

  return (
    <Section id="projects" title="Projects">
      <Reveal type="fade">
        <p className="text-muted-foreground text-lg mb-12 max-w-2xl text-center md:text-left">
          A selection of things I've built while learning, experimenting, and solving real problems.
        </p>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 mb-12">
        {allProjects.map((project, index) => (
          <Reveal key={project.id} type="scale" delay={index * 0.1}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
