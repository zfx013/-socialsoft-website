'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Animation loop pour le suivi fluide
  const animate = useCallback(() => {
    // Interpolation pour le glow (suit avec délai)
    const ease = 0.15;
    cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * ease;
    cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * ease;

    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
    }

    // Le curseur principal suit instantanément
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
    }

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    setIsMounted(true);

    // Détecter si c'est un appareil tactile
    const checkTouch = window.matchMedia('(pointer: coarse)').matches ||
                       'ontouchstart' in window;

    if (checkTouch) {
      setIsActive(false);
      return;
    }

    setIsActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleElementCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], input, textarea, select, [role="button"]');
      setIsHovering(!!interactive);
    };

    // Initialiser la position
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cursorPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementCheck);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Démarrer l'animation
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementCheck);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, isVisible]);

  // SSR et client initial: retourner un conteneur vide mais identique
  if (!isMounted) {
    return (
      <div className="fixed top-0 left-0 pointer-events-none z-[9998]" style={{ opacity: 0 }} />
    );
  }

  // Appareil tactile: conteneur vide
  if (!isActive) {
    return (
      <div className="fixed top-0 left-0 pointer-events-none z-[9998]" style={{ opacity: 0 }} />
    );
  }

  return (
    <>
      {/* Glow qui suit avec délai */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: isHovering ? '50px' : '40px',
          height: isHovering ? '50px' : '40px',
          marginLeft: isHovering ? '-25px' : '-20px',
          marginTop: isHovering ? '-25px' : '-20px',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, margin 0.2s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: isHovering
              ? 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(6px)',
            transition: 'background 0.2s ease',
          }}
        />
      </div>

      {/* Point central */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: isHovering ? '8px' : '6px',
          height: isHovering ? '8px' : '6px',
          marginLeft: isHovering ? '-4px' : '-3px',
          marginTop: isHovering ? '-4px' : '-3px',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s ease, height 0.15s ease, margin 0.15s ease, opacity 0.15s ease',
          willChange: 'transform',
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            backgroundColor: isHovering ? '#06B6D4' : '#ffffff',
            boxShadow: isHovering
              ? '0 0 12px rgba(6, 182, 212, 0.8), 0 0 24px rgba(6, 182, 212, 0.4)'
              : '0 0 8px rgba(255, 255, 255, 0.5)',
            transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
          }}
        />
      </div>

      {/* Cacher le curseur natif */}
      <style jsx global>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
