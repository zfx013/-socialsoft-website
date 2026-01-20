'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  direction?: 'vertical' | 'horizontal';
}

export default function ParallaxLayer({
  children,
  className = '',
  speed = 0.5,
  direction = 'vertical',
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const distance = 100 * speed;

    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        [direction === 'vertical' ? 'y' : 'x']: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: layerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, layerRef);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={layerRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

// Composant pour créer un fond parallax multi-couches
interface ParallaxBackgroundProps {
  className?: string;
}

export function ParallaxBackground({ className = '' }: ParallaxBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Couche lointaine - se déplace lentement */}
      <ParallaxLayer speed={-0.2} className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent-blue/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </ParallaxLayer>

      {/* Couche moyenne */}
      <ParallaxLayer speed={-0.4} className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accent-cyan/15 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </ParallaxLayer>

      {/* Couche proche - se déplace plus vite */}
      <ParallaxLayer speed={-0.6} className="absolute inset-0">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-br from-accent-blue/10 to-accent-cyan/10 rounded-full blur-md"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </ParallaxLayer>
    </div>
  );
}
