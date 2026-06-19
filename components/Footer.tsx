'use client';

import Link from 'next/link';
import { Zap, Mail, MessageCircle, Linkedin, Instagram } from 'lucide-react';
import { navLinks } from '@/data/content';
import { primaryWhatsappUrl, secondaryWhatsappUrl, siteConfig } from '@/config/site';

export default function Footer() {
  const handleNav = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06060e] overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <div className="text-white font-bold leading-none gradient-text text-sm">EKANOVA</div>
                <div className="text-white/40 text-xs font-light">SOLUTIONS</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">Helping students build real-time, industry-grade projects.</p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.social.linkedIn} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white"><Linkedin className="w-4 h-4" /></a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}><button onClick={() => handleNav(link.href)} className="text-white/40 hover:text-white text-sm">{link.label}</button></li>
              ))}
              <li><Link href="/blog" className="text-white/40 hover:text-white text-sm">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`mailto:${siteConfig.businessEmail}`} className="flex items-start gap-2.5 text-white/40 hover:text-white"><Mail className="w-4 h-4 mt-0.5 text-purple-400" /><span className="text-xs break-all">{siteConfig.businessEmail}</span></a>
              <a href={primaryWhatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/40 hover:text-white"><MessageCircle className="w-4 h-4 text-green-400" /><span className="text-xs">Chat on WhatsApp</span></a>
              <a href={secondaryWhatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-white/40 hover:text-white"><MessageCircle className="w-4 h-4 text-green-400" /><span className="text-xs">Alternate WhatsApp</span></a>
              <p className="text-xs text-white/50">+91 85490 70868, +91 74112 88175</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mb-6" />
        <div className="flex items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {new Date().getFullYear()} Ekanova Solutions Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


