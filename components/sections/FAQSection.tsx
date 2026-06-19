'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/data/content';

export default function FAQSection() {
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 bg-[#06060e] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked{' '}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-white/50">Everything you need to know before getting started.</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === i ? 'border-purple-500/20' : 'border-white/5'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left group"
              >
                <span className={`font-medium text-sm sm:text-base transition-colors duration-200 ${
                  openIndex === i ? 'text-white' : 'text-white/70 group-hover:text-white'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-all duration-300 ${
                    openIndex === i ? 'rotate-180 text-purple-400' : 'text-white/30'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-4 text-white/50 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm mb-3">Still have questions?</p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600/80 to-cyan-500/80 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            Ask Us Directly
          </button>
        </div>
      </div>
    </section>
  );
}
