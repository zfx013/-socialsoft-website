'use client';

import { useState, useEffect } from 'react';
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

  // Calculer les styles basés sur l'état
  const containerOpacity = mounted ? (isVisible ? 1 : 0) : 1;
  const glowOpacity = mounted && isAnimating ? (isVisible ? 0.4 : 0) : 0;
  const glowScale = mounted && isAnimating ? 1 : 0.8;
  const logoOpacity = mounted && isAnimating ? (isVisible ? 1 : 0) : 0;
  const logoScale = mounted && isAnimating ? 1 : 0.9;

  return (
    <div
      className="fixed inset-0 z-[100] bg-dark-900 flex items-center justify-center"
      style={{
        opacity: containerOpacity,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: mounted ? 'opacity 1s ease-in-out' : 'none',
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute w-96 h-96 bg-accent-blue/30 rounded-full blur-3xl"
        style={{
          opacity: glowOpacity,
          transform: `scale(${glowScale})`,
          transition: mounted ? 'opacity 1s ease-in-out, transform 1s ease-in-out' : 'none',
        }}
      />

      {/* Logo */}
      <div
        className="relative z-10"
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          transition: mounted ? 'opacity 1s ease-in-out, transform 1s ease-in-out' : 'none',
        }}
      >
        <Image
          src="/images/logo-white.svg"
          alt="SOCIAL SOFT"
          width={500}
          height={260}
          className="w-96 sm:w-[32rem] h-auto"
          priority
        />
      </div>
    </div>
  );
}
