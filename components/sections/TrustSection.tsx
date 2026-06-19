'use client';

import { useEffect, useRef, useState } from 'react';
import { stats } from '@/data/content';

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const trustItems = [
  { label: 'Real-Time Projects', desc: 'Industry-grade code that works in production' },
  { label: 'Deployment Support', desc: 'Your project goes live, guaranteed' },
  { label: 'Student Mentorship', desc: 'Personalized guidance every step of the way' },
  { label: 'Industry-Level Solutions', desc: 'Meets recruiter and academic standards' },
];

export default function TrustSection() {
  return (
    <section id="trust" className="relative py-20 bg-[#06060e] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative group glass-strong rounded-2xl p-6 text-center border border-white/5 hover:border-purple-500/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.05) 0%, transparent 70%)`,
                }}
              />
              <div className="text-4xl lg:text-5xl font-bold mb-2 gradient-text">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/50 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((item, i) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 p-5 rounded-xl border border-white/5 hover:border-cyan-500/20 glass transition-all duration-300 group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:animate-pulse" />
              <h3 className="font-semibold text-white text-sm">{item.label}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
