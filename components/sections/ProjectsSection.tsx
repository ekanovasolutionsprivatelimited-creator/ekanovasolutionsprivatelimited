'use client';

import { useRef, useEffect, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data/content';

export default function ProjectsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 bg-[#07070f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real projects built and delivered for students across India. Every line of code, tested and deployed.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`group relative glass border border-white/5 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070f] via-[#07070f]/40 to-transparent" />

                {/* Difficulty badge */}
                <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full text-xs font-semibold border border-white/10">
                  <span className={project.difficultyColor}>{project.difficulty}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-white text-lg mb-2">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md glass border border-white/10 text-white/60">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1 mb-5">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-white/40">
                      <div className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600/80 to-cyan-500/80 hover:from-purple-600 hover:to-cyan-500 text-white text-xs font-semibold transition-all duration-200">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 hover:border-white/20 text-white text-xs font-semibold transition-all duration-200">
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl glass border border-white/10 hover:border-purple-500/40 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            Request a Custom Project
          </button>
        </div>
      </div>
    </section>
  );
}
