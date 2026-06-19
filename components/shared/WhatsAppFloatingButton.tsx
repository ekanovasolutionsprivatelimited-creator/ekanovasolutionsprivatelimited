'use client';

import { MessageCircle } from 'lucide-react';
import { primaryWhatsappUrl } from '@/config/site';

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={`${primaryWhatsappUrl}?text=${encodeURIComponent('Hi EkaNova Solutions, I need help with an academic project.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}


