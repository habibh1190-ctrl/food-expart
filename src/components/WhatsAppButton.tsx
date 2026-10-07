import React from 'react';
import { MessageSquare } from 'lucide-react';
import { contact } from '../../config/contact.js';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = 'Hello Food Expert, I would like to inquire about your menu and placing an order.',
  className = '',
}) => {
  const cleanWaNumber = contact.whatsapp.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl flex items-center justify-center gap-2.5 font-bold text-xs transition-transform hover:scale-105 active:scale-95 min-h-[48px] min-w-[48px] ${className}`}
    >
      <MessageSquare className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp Order</span>
    </a>
  );
};
