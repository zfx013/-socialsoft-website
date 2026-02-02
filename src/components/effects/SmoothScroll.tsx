'use client';

import { createContext, useContext, ReactNode } from 'react';

// Context pour accéder à Lenis depuis n'importe où (null pour l'instant)
const LenisContext = createContext<null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * SmoothScroll DÉSACTIVÉ temporairement pour isoler le bug de navigation
 * Lenis causait potentiellement des conflits avec React DOM
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  // Lenis désactivé - rendu direct des enfants
  return (
    <LenisContext.Provider value={null}>
      {children}
    </LenisContext.Provider>
  );
}
