'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  createdAt: number;
}

export default function CursorTrail() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
  const particleId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    // Ne pas afficher sur mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    setIsActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Créer des particules seulement si le curseur bouge suffisamment
      if (distance > 5) {
        lastPosition.current = { x: e.clientX, y: e.clientY };

        const newParticle: Particle = {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.5,
          createdAt: Date.now(),
        };

        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    // Nettoyer les vieilles particules
    const cleanup = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(p => now - p.createdAt < 800));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanup);
    };
  }, []);

  // ALWAYS return the same structure to prevent React reconciliation errors
  const shouldShow = mounted && isActive;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: shouldShow ? 1 : 0 }}
    >
      {/* Particules */}
      {particles.map((particle) => {
        const age = Date.now() - particle.createdAt;
        const progress = Math.min(age / 800, 1);
        const currentOpacity = particle.opacity * (1 - progress);
        const currentScale = 1 - progress * 0.5;

        return (
          <div
            key={particle.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
              opacity: currentOpacity,
              transform: `translate(-50%, -50%) scale(${currentScale})`,
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(6, 182, 212, ${particle.opacity}) 0%, rgba(59, 130, 246, ${particle.opacity * 0.5}) 50%, transparent 100%)`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(6, 182, 212, 0.5)`,
              }}
            />
          </div>
        );
      })}

      {/* Ligne de connexion entre les particules */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {particles.length > 1 && particles.map((particle, i) => {
          if (i === 0) return null;
          const prev = particles[i - 1];
          const age = Date.now() - particle.createdAt;
          const opacity = Math.max(0, 0.5 - (age / 800) * 0.5);

          return (
            <line
              key={`line-${particle.id}`}
              x1={prev.x}
              y1={prev.y}
              x2={particle.x}
              y2={particle.y}
              stroke="url(#trailGradient)"
              strokeWidth="1"
              opacity={opacity}
            />
          );
        })}
      </svg>
    </div>
  );
}
