'use client';

import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/content';

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="shrink-0 w-80 glass border border-white/5 rounded-2xl p-6 mx-3 hover:border-white/10 transition-all duration-300 group">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Review */}
      <p className="text-white/70 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{t.name}</div>
          <div className="text-white/40 text-xs">{t.university}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 bg-[#06060e] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            Student Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Students <span className="gradient-text">Say</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Real reviews from real students across universities in India.
          </p>
        </div>

        {/* Infinite scroll row 1 */}
        <div className="relative mb-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#06060e] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#06060e] to-transparent z-10" />
          <div className="flex animate-scroll-left">
            {doubled.map((t, i) => (
              <TestimonialCard key={`${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Infinite scroll row 2 — reverse */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#06060e] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#06060e] to-transparent z-10" />
          <div className="flex" style={{ animation: 'scroll-left 40s linear infinite reverse' }}>
            {[...doubled].reverse().map((t, i) => (
              <TestimonialCard key={`rev-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
