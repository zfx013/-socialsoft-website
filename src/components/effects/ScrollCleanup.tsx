'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Component that handles ScrollTrigger cleanup on route changes
 * Must be placed in the root layout
 */
export default function ScrollCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // On route change, refresh ScrollTrigger after a short delay
    // to allow new components to mount
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      // Kill all ScrollTrigger instances when unmounting
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        try {
          trigger.kill();
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
    };
  }, [pathname]);

  return null;
}
