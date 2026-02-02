'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface NavigationWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper that forces clean remount on navigation
 * This prevents DOM manipulation conflicts during route changes
 */
export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (pathname !== key) {
      // Start navigation transition
      setIsNavigating(true);

      // Small delay to allow cleanup before remount
      const timeout = setTimeout(() => {
        setKey(pathname);
        setIsNavigating(false);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [pathname, key]);

  // During navigation, render nothing briefly to allow clean unmount
  if (isNavigating) {
    return (
      <div className="min-h-screen bg-dark-900" />
    );
  }

  return (
    <div key={key}>
      {children}
    </div>
  );
}
