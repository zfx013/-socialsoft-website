'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disparaît après l'animation (glow/pulse ~1s + fade 1s)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-dark-900 flex items-center justify-center"
        >
          {/* Glow effect - une seule pulsation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.6, 0.4],
              scale: [0.8, 1.2, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: 'easeInOut'
            }}
            className="absolute w-96 h-96 bg-accent-blue/30 rounded-full blur-3xl"
          />

          {/* Logo - une seule pulsation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0.9, 1.03, 1],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: 'easeInOut'
            }}
            className="relative z-10"
          >
            <Image
              src="/images/logo-white.svg"
              alt="SOCIAL SOFT"
              width={500}
              height={260}
              className="w-96 sm:w-[32rem] h-auto"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
