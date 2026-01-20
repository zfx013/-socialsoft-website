'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { contact } from '@/lib/constants';

export default function StickyContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-40"
        >
          {/* Contact options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
              >
                <motion.a
                  href={contact.phoneLink}
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 bg-dark-700 rounded-lg border border-dark-600 hover:border-accent-blue/50 transition-colors shadow-lg"
                >
                  <Mail className="w-5 h-5 text-accent-blue" />
                  <span className="text-light-100 font-medium">Email</span>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

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
            {isOpen ? (
              <X className="w-6 h-6 text-light-100" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
