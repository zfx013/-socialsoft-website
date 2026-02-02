'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { navigation, contact } from '@/lib/constants';

interface MenuOverlayProps {
  onClose: () => void;
}

export default function MenuOverlay({ onClose }: MenuOverlayProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.1 },
    },
    exit: { opacity: 0, scale: 0.95 },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 + i * 0.1 },
    }),
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-dark-900/98 backdrop-blur-lg overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-4 sm:right-6 p-2 text-light-100 hover:text-accent-blue transition-colors"
        aria-label="Fermer le menu"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Menu content */}
      <motion.div
        variants={menuVariants}
        className="flex flex-col items-center justify-center min-h-screen px-4 py-20"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Image
            src="/images/logo-white.svg"
            alt="SOCIAL SOFT"
            width={200}
            height={50}
            className="h-12 w-auto"
          />
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-4 mb-12 w-full max-w-sm">
          {navigation.map((item, i) => (
            <motion.div
              key={item.name}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="w-full text-center"
            >
              {item.dropdown && item.items ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-center gap-2 w-full text-3xl sm:text-4xl font-bold text-light-100 hover:text-accent-blue transition-colors duration-200"
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 mt-4 mb-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={onClose}
                              className="text-xl text-light-300 hover:text-accent-blue transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-3xl sm:text-4xl font-bold text-light-100 hover:text-accent-blue transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href={contact.phoneLink}
            className="block text-xl text-light-200 hover:text-accent-blue transition-colors mb-2"
          >
            {contact.phoneFormatted}
          </a>
          <a
            href={contact.emailLink}
            className="block text-lg text-light-200 hover:text-accent-blue transition-colors"
          >
            {contact.email}
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
