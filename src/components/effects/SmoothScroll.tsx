'use client';

import { useEffect, useRef, createContext, useContext, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Context pour accéder à Lenis depuis n'importe où
const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafCallbackRef = useRef<((time: number) => void) | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if we're on the client
    if (typeof window === 'undefined') return;

    // Vérifier prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return; // Pas de smooth scroll si l'utilisateur préfère moins de mouvement
    }

    // Initialiser Lenis avec wrapper: document.body pour éviter les conflits DOM
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      wrapper: window as unknown as HTMLElement, // Utiliser window au lieu d'un wrapper DOM
      content: document.documentElement,
    });

    lenisRef.current = lenis;

    // Connecter Lenis à GSAP ScrollTrigger
    const scrollHandler = () => ScrollTrigger.update();
    lenis.on('scroll', scrollHandler);

    // Create a stable reference for the RAF callback
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    rafCallbackRef.current = rafCallback;

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      // Remove the RAF callback using the same reference
      if (rafCallbackRef.current) {
        gsap.ticker.remove(rafCallbackRef.current);
      }
      lenis.off('scroll', scrollHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
