import React from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { GithubIcon } from '../ui/icons';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const ProjectCard = ({ project }) => {
  return (
    <Card className="project-card flex flex-col h-full bg-white/40 backdrop-blur-sm border border-black/5 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <Folder strokeWidth={1.5} size={40} className="project-icon-folder text-primary/70" />
        <div className="flex gap-4">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Repository" 
              className="project-icon-link text-muted-foreground"
            >
              <GithubIcon size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Live Demo" 
              className="project-icon-link text-muted-foreground"
            >
              <ExternalLink size={22} />
            </a>
          )}
        </div>
      </div>
      
      <h3 className="project-title text-xl md:text-2xl font-bold mb-2 text-foreground tracking-tight">
        {project.title}
      </h3>
      {project.status && (
        <div className="mb-3">
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium border ${
            project.status.includes('Completed') ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' :
            project.status.includes('Planned') ? 'bg-sky-500/10 text-sky-700 border-sky-500/20' :
            'bg-amber-500/10 text-amber-700 border-amber-500/20'
          }`}>
            {project.status}
          </span>
        </div>
      )}
      <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map(tech => (
          <Badge key={tech} variant="outline" className="project-tech-tag text-[11px] px-2.5 py-0.5 bg-white/60 border-black/5 text-muted-foreground">
            {tech}
          </Badge>
        ))}
      </div>
    </Card>
  );
};
