'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

export default function PageVisitTracker() {
  useEffect(() => {
    // Track page visit on mount (only once per page load)
    trackEvent('page_visit');
  }, []);

  return null;
}
