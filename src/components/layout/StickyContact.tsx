'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { contact } from '@/lib/constants';
import { trackEvent } from '@/lib/tracking';

export default function StickyContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ALWAYS return the same structure to prevent React reconciliation errors
  const shouldShow = mounted && isVisible;

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: shouldShow ? 1 : 0,
        scale: shouldShow ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
      style={{ pointerEvents: shouldShow ? 'auto' : 'none' }}
    >
      {/* Contact options */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <motion.a
          href={contact.phoneLink}
          onClick={() => trackEvent('phone_click')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-4 py-3 bg-dark-700 rounded-lg border border-dark-600 hover:border-accent-blue/50 transition-colors shadow-lg"
        >
          <Phone className="w-5 h-5 text-accent-blue" />
          <span className="text-light-100 font-medium whitespace-nowrap">
            {contact.phoneFormatted}
          </span>
        </motion.a>
        <motion.a
          href={contact.emailLink}
          onClick={() => trackEvent('email_click')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-4 py-3 bg-dark-700 rounded-lg border border-dark-600 hover:border-accent-blue/50 transition-colors shadow-lg"
        >
          <Mail className="w-5 h-5 text-accent-blue" />
          <span className="text-light-100 font-medium">Email</span>
        </motion.a>
      </motion.div>

      {/* Main button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-dark-700 border border-dark-600'
            : 'bg-accent-blue glow-effect'
        }`}
        aria-label={isOpen ? 'Fermer les options de contact' : 'Options de contact'}
      >
        {/* Always render both icons, control visibility with opacity */}
        <X
          className="w-6 h-6 text-light-100 absolute transition-opacity"
          style={{ opacity: isOpen ? 1 : 0 }}
        />
        <MessageCircle
          className="w-6 h-6 text-white absolute transition-opacity"
          style={{ opacity: isOpen ? 0 : 1 }}
        />
      </motion.button>
    </motion.div>
  );
}
