'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { navigation, contact } from '@/lib/constants';

interface MenuOverlayProps {
  onClose: () => void;
}

export default function MenuOverlay({ onClose }: MenuOverlayProps) {
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

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-dark-900/98 backdrop-blur-lg"
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
        className="flex flex-col items-center justify-center h-full px-4"
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
        <nav className="flex flex-col items-center gap-6 mb-12">
          {navigation.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={onClose}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl sm:text-4xl font-bold text-light-100 hover:text-accent-blue transition-colors duration-200"
            >
              {item.name}
            </motion.a>
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
