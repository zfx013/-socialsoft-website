'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, MessageSquare } from 'lucide-react';
import { contact } from '@/lib/constants';
import { trackEvent, TrackingEvent } from '@/lib/tracking';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past the hero section
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const options: { icon: typeof Phone; label: string; href: string; color: string; trackingEvent?: TrackingEvent; onClick?: () => void }[] = [
    {
      icon: Phone,
      label: 'Appeler',
      href: contact.phoneLink,
      color: 'bg-green-500 hover:bg-green-600',
      trackingEvent: 'phone_click',
    },
    {
      icon: Mail,
      label: 'Email',
      href: contact.emailLink,
      color: 'bg-accent-blue hover:bg-accent-blue/90',
      trackingEvent: 'email_click',
    },
    {
      icon: MessageSquare,
      label: 'Formulaire',
      href: '#contact',
      color: 'bg-accent-cyan hover:bg-accent-cyan/90',
      trackingEvent: 'contact_click',
      onClick: () => setIsOpen(false),
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Options */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 right-0 flex flex-col gap-3"
              >
                {options.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.a
                      key={option.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      href={option.href}
                      onClick={() => {
                        if (option.trackingEvent) trackEvent(option.trackingEvent);
                        if (option.onClick) option.onClick();
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-full ${option.color} text-white shadow-lg transition-all duration-200 whitespace-nowrap`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{option.label}</span>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
              isOpen
                ? 'bg-dark-700 text-light-100'
                : 'bg-gradient-to-r from-accent-blue to-accent-cyan text-white'
            }`}
          >
            {/* Pulse animation when closed */}
            {!isOpen && (
              <>
                <span className="absolute inset-0 rounded-full bg-accent-blue/30 animate-ping" />
                <span className="absolute inset-0 rounded-full bg-accent-blue/20 animate-pulse" />
              </>
            )}

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MessageCircle className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>

          {/* Tooltip */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-dark-700 text-light-100 text-sm whitespace-nowrap hidden lg:block"
            >
              Besoin d&apos;aide ?
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-dark-700 rotate-45" />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
