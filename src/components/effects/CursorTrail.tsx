'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const particleId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Ne pas afficher sur mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    setIsVisible(true);

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
        };

        setParticles(prev => [...prev.slice(-20), newParticle]);
      }
    };

    // Nettoyer les vieilles particules
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-15));
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanup);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: particle.opacity,
              scale: 1,
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: particle.size,
              height: particle.size,
              left: 0,
              top: 0,
              x: particle.x,
              y: particle.y,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(6, 182, 212, ${particle.opacity}) 0%, rgba(59, 130, 246, ${particle.opacity * 0.5}) 50%, transparent 100%)`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(6, 182, 212, 0.5)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

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
          return (
            <motion.line
              key={`line-${particle.id}`}
              x1={prev.x}
              y1={prev.y}
              x2={particle.x}
              y2={particle.y}
              stroke="url(#trailGradient)"
              strokeWidth="1"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
