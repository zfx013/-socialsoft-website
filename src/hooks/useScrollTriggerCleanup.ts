'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

// Register plugin once at module level with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook to clean up all ScrollTrigger instances on route change
 * This prevents errors when navigating between pages
 */
export function useScrollTriggerCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Kill all ScrollTrigger instances when route changes
    return () => {
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => trigger.kill());
    };
  }, [pathname]);
}

/**
 * Safe GSAP context that ensures proper cleanup
 */
export function useGsapContext(callback: () => void, deps: React.DependencyList = []) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(callback);

    return () => {
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
