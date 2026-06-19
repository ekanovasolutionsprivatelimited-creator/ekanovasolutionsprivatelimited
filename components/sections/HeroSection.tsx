'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, ChevronDown, Star, Users, Code as Code2, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollDown = () => {
    const el = document.getElementById('trust');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#06060e]"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(168,85,247,0.15) 0%, transparent 60%)`,
          }}
        />
        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] animate-blob" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-16 left-1/3 w-80 h-80 rounded-full bg-blue-600/10 blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />

        {/* Gradient mesh */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 60%)',
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/70">Student-Focused Tech Solutions</span>
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              <span className="text-white">Turning Student</span>
              <br />
              <span className="gradient-text">Ideas into</span>
              <br />
              <span className="text-white">Real-Time Projects</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-xl">
              Industry-level <span className="text-cyan-400 font-medium">MERN, AI/ML, NLP</span>, and{' '}
              <span className="text-purple-400 font-medium">Mobile App</span> projects with deployment,
              documentation, and viva support — built for your success.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 hover:scale-105"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:border-purple-500/40 hover:bg-white/5 transition-all duration-300"
              >
                <Play className="w-4 h-4 text-purple-400" />
                Book Free Consultation
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {['AS', 'PM', 'RP', 'SI'].map((name, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-[#06060e] flex items-center justify-center text-[9px] font-bold text-white ${
                      ['bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-green-500'][i]
                    }`}
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-white/50 mt-0.5">Trusted by 100+ students</p>
              </div>
            </div>
          </div>

          {/* Right — Dashboard Mockup */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              {/* Main card */}
              <div className="glass-strong rounded-2xl border border-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                {/* Card header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-xs text-white/30 font-mono">ai-resume-analyzer.tsx</div>
                </div>

                {/* Code preview */}
                <div className="font-mono text-sm space-y-1.5 mb-5">
                  <div className="text-purple-400"><span className="text-white/30">01 </span>const <span className="text-cyan-400">analyzeResume</span> = async (file) {'{'}</div>
                  <div className="text-white/50 pl-4"><span className="text-white/30">02 </span>const nlpModel = <span className="text-green-400">await</span> <span className="text-yellow-400">loadBERT()</span>;</div>
                  <div className="text-white/50 pl-4"><span className="text-white/30">03 </span>const score = <span className="text-green-400">await</span> <span className="text-yellow-400">getATSScore(file)</span>;</div>
                  <div className="text-white/50 pl-4"><span className="text-white/30">04 </span><span className="text-blue-400">return</span> {'{ score, gaps, suggestions }'}</div>
                  <div className="text-purple-400"><span className="text-white/30">05 </span>{'}'}</div>
                </div>

                {/* Progress bars */}
                <div className="space-y-3">
                  {[
                    { label: 'ATS Score', value: 87, color: 'from-green-500 to-emerald-400' },
                    { label: 'Skill Match', value: 73, color: 'from-purple-500 to-cyan-400' },
                    { label: 'Format Score', value: 95, color: 'from-blue-500 to-cyan-400' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/60">{item.label}</span>
                        <span className="text-white font-medium">{item.value}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass border border-cyan-500/20 rounded-xl px-3 py-2 animate-float">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-white/80 font-medium">MERN Stack</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass border border-purple-500/20 rounded-xl px-3 py-2 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-white/80 font-medium">100+ Students</span>
                </div>
              </div>

              {/* Tech badges floating */}
              {['Python', 'React', 'MongoDB', 'TensorFlow'].map((tech, i) => (
                <div
                  key={tech}
                  className="absolute glass border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-medium text-white/70 animate-float"
                  style={{
                    top: `${20 + i * 20}%`,
                    right: `-${60 + i * 5}px`,
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: '5s',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors group"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}
