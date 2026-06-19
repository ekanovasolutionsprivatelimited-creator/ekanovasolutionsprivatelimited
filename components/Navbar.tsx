'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Zap, Moon, Sun } from 'lucide-react';
import { navLinks } from '@/data/content';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#06060e]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow duration-300">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              <span className="gradient-text">EKANOVA</span>
              <span className="text-white/80 font-light text-sm ml-1">SOLUTIONS</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg border border-white/15 p-2 text-white/80 hover:text-white"
              aria-label="Toggle theme"
            >
              {mounted ? (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />) : <span className="block h-4 w-4" />}
            </button>
            <Link href="/blog" className="text-sm text-white/70 hover:text-white">Blog</Link>
            <button
              onClick={() => handleNavClick('#contact')}
              className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold overflow-hidden transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              <span className="relative z-10 text-white">Get Started</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0a14]/95 backdrop-blur-2xl border-b border-white/5">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3">
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

