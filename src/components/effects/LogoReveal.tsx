'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Délai pour attendre la fin du splash screen (1.2s animation + 1s fade)
const SPLASH_DURATION = 2300;

export default function LogoReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsRevealed(true);
      return;
    }

    // Attendre la fin du splash screen
    const visibleTimer = setTimeout(() => {
      setIsVisible(true);
    }, SPLASH_DURATION);

    // Marquer comme révélé après l'animation
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, SPLASH_DURATION + 1200);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(revealTimer);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="relative flex items-center justify-center">
        <Image
          src="/images/logo-white.svg"
          alt="SOCIALSOFT"
          width={450}
          height={120}
          className="w-[450px] h-auto"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center h-[80px]">
      {/* Glow derrière le logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-[500px] h-[150px] blur-2xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.5) 0%, transparent 70%)'
          }}
        />
      </motion.div>

      {/* Container pour l'effet de révélation */}
      <div className="relative">
        {/* Logo caché (silhouette grise) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 0.15 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/logo-white.svg"
            alt=""
            width={450}
            height={120}
            className="w-[450px] h-auto"
            style={{ filter: 'brightness(0.3)' }}
          />
        </motion.div>

        {/* Logo révélé avec clip-path animé */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: isVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
        >
          <Image
            src="/images/logo-white.svg"
            alt="SOCIALSOFT"
            width={450}
            height={120}
            className="w-[450px] h-auto"
            priority
          />
        </motion.div>

        {/* Ligne de scan */}
        {isVisible && !isRevealed && (
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
            initial={{ left: '0%' }}
            animate={{ left: '100%' }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          >
            {/* Ligne principale */}
            <div className="absolute inset-y-0 w-[2px] bg-accent-cyan" />

            {/* Glow de la ligne */}
            <div className="absolute inset-y-0 -left-2 w-6 bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent blur-sm" />

            {/* Particules autour de la ligne */}
            <motion.div
              className="absolute -left-1 top-1/4 w-1 h-1 bg-accent-cyan rounded-full"
              animate={{ opacity: [0, 1, 0], y: [-5, 5] }}
              transition={{ duration: 0.3, repeat: 3 }}
            />
            <motion.div
              className="absolute -left-1 top-2/4 w-1 h-1 bg-white rounded-full"
              animate={{ opacity: [0, 1, 0], y: [5, -5] }}
              transition={{ duration: 0.25, repeat: 4, delay: 0.1 }}
            />
            <motion.div
              className="absolute -left-1 top-3/4 w-1 h-1 bg-accent-cyan rounded-full"
              animate={{ opacity: [0, 1, 0], y: [-3, 3] }}
              transition={{ duration: 0.35, repeat: 3, delay: 0.05 }}
            />
          </motion.div>
        )}

        {/* Effet de brillance après révélation */}
        {isRevealed && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: [0, 0.6, 0], x: '200%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                width: '50%'
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Glow pulsant subtil après révélation */}
      {isRevealed && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-[480px] h-[120px] blur-xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
