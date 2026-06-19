'use client';

import { useRef, useEffect, useState } from 'react';
import { Code as Code2, Brain, MessageSquare, Smartphone, FileText, Rocket, Check } from 'lucide-react';
import { services } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Brain, MessageSquare, Smartphone, FileText, Rocket,
};

const colorMap: Record<string, string> = {
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  cyan: 'text-cyan-400',
  green: 'text-green-400',
  orange: 'text-orange-400',
  pink: 'text-pink-400',
};

export default function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-24 bg-[#06060e] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            End-to-end project solutions tailored for academic excellence and industry readiness.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const textColor = colorMap[service.color] || 'text-white';
            return (
              <div
                key={service.title}
                className={`group relative rounded-2xl glass border ${service.border} p-6 hover:border-opacity-50 transition-all duration-500 overflow-hidden cursor-default ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${service.glow.replace(')', ', 0.07)')}, transparent 70%)` }}
                />
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl glass border border-white/10 mb-4 group-hover:border-opacity-50 transition-all duration-300`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>

                  <h3 className="font-bold text-white text-lg mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-1.5">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <Check className={`w-3.5 h-3.5 ${textColor} shrink-0`} />
                        <span className="text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
