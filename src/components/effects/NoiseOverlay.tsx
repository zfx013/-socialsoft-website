'use client';

import { useEffect, useState } from 'react';

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export default function NoiseOverlay({ opacity = 0.03, className = '' }: NoiseOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setMounted(true);
    }
  }, []);

  // ALWAYS return the same structure to prevent React reconciliation errors
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9998] ${className}`}
      style={{ opacity: mounted ? opacity : 0 }}
    >
      {/* SVG Noise Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* Noise layer */}
      <div
        className="absolute inset-0"
        style={{
          filter: 'url(#noise)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Animated scan lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          )`,
          backgroundSize: '100% 4px',
          animation: mounted ? 'scanlines 8s linear infinite' : 'none',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
        }}
      />

      <style jsx>{`
        @keyframes scanlines {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>
  );
}
