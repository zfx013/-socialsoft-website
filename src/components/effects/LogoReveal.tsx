'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LogoReveal() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showScanLine, setShowScanLine] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Délai après le SplashScreen (qui dure ~1200ms) avant de commencer l'animation
    const visibleTimer = setTimeout(() => {
      setIsVisible(true);
      setShowScanLine(true);
    }, 1400);

    // Marquer comme révélé après l'animation
    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
      setShowScanLine(false);
    }, 2600);

    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  // Calculer les styles
  const glowBehindOpacity = mounted && isRevealed ? 1 : 0;
  const silhouetteOpacity = mounted && isVisible ? 0.15 : 0;
  const clipPath = mounted && isVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)';
  const scanLineLeft = mounted && showScanLine ? '100%' : '0%';
  const scanLineOpacity = mounted && showScanLine ? 1 : 0;
  const pulsingGlowOpacity = mounted && isRevealed ? 0.15 : 0;

  return (
    <div className="relative flex items-center justify-center h-[80px]">
      {/* Glow derrière le logo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: glowBehindOpacity,
          transition: mounted ? 'opacity 0.5s ease' : 'none',
        }}
      >
        <div
          className="w-[500px] h-[150px] blur-2xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(0, 212, 255, 0.5) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Container pour l'effet de révélation */}
      <div className="relative">
        {/* Logo caché (silhouette grise) */}
        <div
          style={{
            opacity: silhouetteOpacity,
            transition: mounted ? 'opacity 0.3s ease' : 'none',
          }}
        >
          <Image
            src="/images/logo-white.svg"
            alt=""
            width={450}
            height={120}
            className="w-[450px] h-auto"
            style={{ filter: 'brightness(0.3)' }}
          />
        </div>

        {/* Logo révélé avec clip-path animé */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: clipPath,
            transition: mounted ? 'clip-path 1s cubic-bezier(0.65, 0, 0.35, 1) 0.2s' : 'none',
          }}
        >
          <Image
            src="/images/logo-white.svg"
            alt="SOCIALSOFT"
            width={450}
            height={120}
            className="w-[450px] h-auto"
            priority
          />
        </div>

        {/* Ligne de scan */}
        <div
          className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
          style={{
            left: scanLineLeft,
            opacity: scanLineOpacity,
            transition: mounted
              ? 'left 1s cubic-bezier(0.65, 0, 0.35, 1) 0.2s, opacity 0.2s ease'
              : 'none',
          }}
        >
          <div className="absolute inset-y-0 w-[2px] bg-accent-cyan" />
          <div className="absolute inset-y-0 -left-2 w-6 bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent blur-sm" />
        </div>
      </div>

      {/* Glow pulsant subtil après révélation */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: pulsingGlowOpacity,
          animation: mounted && isRevealed ? 'pulse-glow 3s ease-in-out infinite' : 'none',
        }}
      >
        <div
          className="w-[480px] h-[120px] blur-xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Keyframes pour le glow pulsant */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}
