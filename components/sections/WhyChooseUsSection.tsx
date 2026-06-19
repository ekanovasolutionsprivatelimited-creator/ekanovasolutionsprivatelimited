'use client';

import { useRef, useEffect, useState } from 'react';
import { Zap, DollarSign, FileCheck, GraduationCap, Globe, Users } from 'lucide-react';
import { whyChooseUs } from '@/data/content';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap, DollarSign, FileCheck, GraduationCap, Globe, Users,
};

const colorConfig: Record<string, { text: string; bg: string; glow: string }> = {
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'rgba(234,179,8,0.2)' },
  green: { text: 'text-green-400', bg: 'bg-green-500/10', glow: 'rgba(34,197,94,0.2)' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', glow: 'rgba(59,130,246,0.2)' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'rgba(168,85,247,0.2)' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', glow: 'rgba(0,212,255,0.2)' },
  pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', glow: 'rgba(236,72,153,0.2)' },
};

export default function WhyChooseUsSection() {
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
    <section id="why-us" ref={sectionRef} className="relative py-24 bg-[#06060e] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cyan-600/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            Why Ekanova
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose <span className="gradient-text">Us?</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            We&apos;re not just developers - we&apos;re mentors, educators, and partners in your academic journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || Zap;
            const colors = colorConfig[item.color] || colorConfig.blue;
            return (
              <div
                key={item.title}
                className={`group relative glass border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-500 overflow-hidden ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${colors.glow} 0%, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl ${colors.bg} mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
