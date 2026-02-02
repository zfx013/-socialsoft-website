'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * Force complete unmount/remount on navigation
 * This prevents React DOM reconciliation errors
 * by using the pathname as a key
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();

  // Using pathname as key forces React to completely
  // destroy and recreate the DOM tree on navigation
  return <div key={pathname}>{children}</div>;
}
