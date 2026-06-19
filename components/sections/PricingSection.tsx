'use client';

import { useRef, useEffect, useState } from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { pricingPlans } from '@/data/content';

const colorConfig: Record<string, { badge: string; button: string; glow: string; border: string }> = {
  blue: {
    badge: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    button: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-300',
    glow: 'rgba(59,130,246,0.1)',
    border: 'border-blue-500/10',
  },
  purple: {
    badge: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    button: 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    glow: 'rgba(168,85,247,0.1)',
    border: 'border-purple-500/30',
  },
  cyan: {
    badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    button: 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-300',
    glow: 'rgba(0,212,255,0.1)',
    border: 'border-cyan-500/10',
  },
};

export default function PricingSection() {
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
    <section id="pricing" ref={sectionRef} className="relative py-24 bg-[#07070f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple, Transparent{' '}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Student-friendly pricing with no hidden fees. Pay once, get your project delivered.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {pricingPlans.map((plan, i) => {
            const colors = colorConfig[plan.color];
            return (
              <div
                key={plan.name}
                className={`relative h-full glass rounded-2xl border ${colors.border} p-7 transition-all duration-500 ${
                  plan.popular ? 'lg:scale-[1.02] shadow-[0_20px_80px_rgba(168,85,247,0.2)]' : ''
                } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors.glow} 0%, transparent 70%)` }}
                />

                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative z-10 flex h-full flex-col ${plan.popular ? 'pt-4' : ''}`}>
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${colors.badge}`}>
                    {plan.name}
                  </div>

                  <div className="mb-1">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-white/40 text-sm ml-2">{plan.period}</span>
                  </div>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">{plan.description}</p>

                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className={`w-full py-3 rounded-xl text-sm font-semibold border transition-all duration-300 mb-6 ${colors.button}`}
                  >
                    Get Started
                  </button>

                  <div className="space-y-2.5 mt-auto">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm">
                        <Check className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-white/70">{f}</span>
                      </div>
                    ))}
                    {plan.missing.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm">
                        <X className="w-4 h-4 text-white/20 shrink-0" />
                        <span className="text-white/25 line-through">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-sm mt-8">
          Need a custom quote?{' '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
          >
            Contact us
          </button>{' '}
          for enterprise pricing.
        </p>
      </div>
    </section>
  );
}
