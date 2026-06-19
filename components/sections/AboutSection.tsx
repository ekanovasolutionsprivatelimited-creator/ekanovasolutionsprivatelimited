'use client';

import { useRef, useEffect, useState } from 'react';
import { Target, Lightbulb, Users, Rocket } from 'lucide-react';

const timeline = [
  { year: '2022', title: 'Founded', desc: 'Started with a mission to bridge the gap between academic learning and industry expectations.' },
  { year: '2023', title: 'First 50 Students', desc: 'Successfully delivered 50+ projects with 95% satisfaction. Expanded to NLP and ML domains.' },
  { year: '2024', title: 'Full Deployment Suite', desc: 'Launched complete deployment + viva support. Became the go-to platform for final year projects.' },
  { year: '2025', title: 'Scaling Up', desc: '100+ students supported, 50+ projects live. Partnering with universities across India.' },
];

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    color: 'text-purple-400',
    bg: 'from-purple-500/10 to-transparent',
    desc: 'Empower every student to build real, deployable projects that actually matter — not just submissions that collect dust.',
  },
  {
    icon: Lightbulb,
    title: 'Our Vision',
    color: 'text-cyan-400',
    bg: 'from-cyan-500/10 to-transparent',
    desc: 'A future where every student graduates with a portfolio of industry-grade projects and the confidence to take on real challenges.',
  },
  {
    icon: Users,
    title: 'Why We Exist',
    color: 'text-blue-400',
    bg: 'from-blue-500/10 to-transparent',
    desc: 'Academic projects often lack real-world complexity. We fill that gap with mentored, deployed, documented solutions.',
  },
];

export default function AboutSection() {
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

  return (
    <section id="about" ref={sectionRef} className="relative py-24 bg-[#07070f] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 glass text-xs text-white/50 mb-4">
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Built for Students,{' '}
            <span className="gradient-text">By Builders</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            We started Ekanova Solutions because we saw students struggling with the gap between
            theoretical education and the real-world skills that employers demand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Pillars */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group p-6 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex gap-4">
                  <div className={`p-2.5 rounded-xl glass border border-white/10 ${pillar.color} shrink-0`}>
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{pillar.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Real world experience card */}
            <div className="p-6 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-cyan-500/5">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white">Real-World Experience</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Every project we build includes live deployment, documentation, and post-delivery support.
                Students don't just submit code — they present working products.
              </p>
            </div>
          </div>

          {/* Right: Timeline */}
          <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h3 className="text-lg font-semibold text-white/70 mb-6">Our Journey</h3>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/30 to-transparent" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={item.year} className="flex gap-6 pl-12 relative">
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full glass border border-purple-500/30 flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-purple-400">{item.year.slice(2)}</span>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/30 font-mono">{item.year}</span>
                        <span className="h-px flex-1 bg-white/5" />
                      </div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
