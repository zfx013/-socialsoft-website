'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Démarrer l'animation après le montage
    const startTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 50);

    // Disparaît après l'animation
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // SSR: render placeholder statique
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[100] bg-dark-900 flex items-center justify-center">
        <div className="relative z-10">
          <Image
            src="/images/logo-white.svg"
            alt="SOCIAL SOFT"
            width={500}
            height={260}
            className="w-96 sm:w-[32rem] h-auto opacity-0"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] bg-dark-900 flex items-center justify-center"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Glow effect */}
      <motion.div
        initial={false}
        animate={{
          opacity: isAnimating ? (isVisible ? 0.4 : 0) : 0,
          scale: isAnimating ? 1 : 0.8,
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
        className="absolute w-96 h-96 bg-accent-blue/30 rounded-full blur-3xl"
      />

      {/* Logo */}
      <motion.div
        initial={false}
        animate={{
          opacity: isAnimating ? (isVisible ? 1 : 0) : 0,
          scale: isAnimating ? 1 : 0.9,
        }}
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
  );
}
