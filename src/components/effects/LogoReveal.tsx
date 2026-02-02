'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LogoReveal() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showScanLine, setShowScanLine] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Délai court avant de commencer l'animation
    const visibleTimer = setTimeout(() => {
      setIsVisible(true);
      setShowScanLine(true);
    }, 500);

    // Marquer comme révélé après l'animation
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
      setShowScanLine(false);
    }, 1700);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  // Avant le montage, afficher le logo caché
  if (!mounted) {
    return (
      <div className="relative flex items-center justify-center h-[80px]">
        <div className="relative">
          <Image
            src="/images/logo-white.svg"
            alt="SOCIALSOFT"
            width={450}
            height={120}
            className="w-[450px] h-auto opacity-0"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center h-[80px]">
      {/* Glow derrière le logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={false}
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
          initial={false}
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
          initial={false}
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

        {/* Ligne de scan - toujours dans le DOM */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
          initial={false}
          animate={{
            left: showScanLine ? '100%' : '0%',
            opacity: showScanLine ? 1 : 0
          }}
          transition={{
            left: { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.2 },
            opacity: { duration: 0.2 }
          }}
        >
          <div className="absolute inset-y-0 w-[2px] bg-accent-cyan" />
          <div className="absolute inset-y-0 -left-2 w-6 bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent blur-sm" />
        </motion.div>
      </div>

      {/* Glow pulsant subtil après révélation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={false}
        animate={{
          opacity: isRevealed ? [0.1, 0.25, 0.1] : 0
        }}
        transition={{
          duration: 3,
          repeat: isRevealed ? Infinity : 0,
          ease: 'easeInOut'
        }}
      >
        <div
          className="w-[480px] h-[120px] blur-xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
          }}
        />
      </motion.div>
    </div>
  );
}
