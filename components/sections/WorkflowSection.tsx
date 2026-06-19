'use client';

import { useRef, useEffect, useState } from 'react';
import { MessageCircle, LayoutGrid as Layout, Code as Code2, FileText, Rocket, GraduationCap } from 'lucide-react';
import { workflowSteps } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle, Layout, Code2, FileText, Rocket, GraduationCap,
};

export default function WorkflowSection() {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <section id="workflow" ref={sectionRef} className="relative py-24 bg-[#07070f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            A structured, transparent process from your first idea to a live, deployed project.
          </p>
        </div>

        {/* Desktop — horizontal steps */}
        <div className="hidden lg:block">
          {/* Connector line */}
          <div className="relative mb-12">
            <div className="absolute top-8 left-[8.33%] right-[8.33%] h-px bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20" />
            <div
              className="absolute top-8 left-[8.33%] h-px bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${(activeStep / (workflowSteps.length - 1)) * 83.34}%` }}
            />
            <div className="grid grid-cols-6 gap-4">
              {workflowSteps.map((step, i) => {
                const Icon = iconMap[step.icon] || Code2;
                const isActive = i <= activeStep;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(i)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-600/40 to-cyan-500/40 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                        : 'glass border-white/10'
                    }`}>
                      <Icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-white/30'}`} />
                    </div>
                    <span className={`text-xs font-medium text-center leading-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30'}`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active step detail */}
          <div className="glass-strong rounded-2xl border border-white/5 p-8 transition-all duration-500">
            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold gradient-text opacity-20 leading-none">
                {workflowSteps[activeStep].step}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{workflowSteps[activeStep].title}</h3>
                <p className="text-white/60 leading-relaxed">{workflowSteps[activeStep].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile — vertical steps */}
        <div className="lg:hidden space-y-4">
          {workflowSteps.map((step, i) => {
            const Icon = iconMap[step.icon] || Code2;
            return (
              <div
                key={step.step}
                className={`flex gap-4 p-5 rounded-2xl glass border transition-all duration-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 80}ms`, borderColor: i === activeStep ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.05)' }}
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono mb-1">Step {step.step}</div>
                  <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
