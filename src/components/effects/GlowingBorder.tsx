'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  glowColor?: 'cyan' | 'blue' | 'gradient';
  animated?: boolean;
  hoverOnly?: boolean;
}

export default function GlowingBorder({
  children,
  className = '',
  borderRadius = '1rem',
  glowColor = 'gradient',
  animated = true,
  hoverOnly = false,
}: GlowingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animated || hoverOnly) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [animated, hoverOnly]);

  const shouldAnimate = isVisible && (!hoverOnly || isHovered);

  const gradientColors = {
    cyan: 'rgba(6, 182, 212, 0.8), rgba(6, 182, 212, 0.2)',
    blue: 'rgba(59, 130, 246, 0.8), rgba(59, 130, 246, 0.2)',
    gradient: 'rgba(6, 182, 212, 0.8), rgba(59, 130, 246, 0.8), rgba(6, 182, 212, 0.2)',
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius }}
    >
      {/* Border glow container */}
      <div
        className="absolute -inset-[1px] overflow-hidden"
        style={{ borderRadius }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, ${gradientColors[glowColor]})`,
            borderRadius,
          }}
          animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-sm"
          style={{
            background: `conic-gradient(from 0deg, ${gradientColors[glowColor]})`,
            borderRadius,
          }}
          animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Inner content container */}
      <div
        className="relative bg-dark-800"
        style={{ borderRadius }}
      >
        {children}
      </div>

      {/* Light trail effect */}
      {shouldAnimate && (
        <motion.div
          className="absolute -inset-[1px] overflow-hidden pointer-events-none"
          style={{ borderRadius }}
        >
          <motion.div
            className="absolute w-20 h-20"
            style={{
              background: `radial-gradient(circle, ${glowColor === 'cyan' ? 'rgba(6, 182, 212, 0.8)' : glowColor === 'blue' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(6, 182, 212, 0.8)'} 0%, transparent 70%)`,
              filter: 'blur(4px)',
            }}
            animate={{
              left: ['0%', '100%', '100%', '0%', '0%'],
              top: ['0%', '0%', '100%', '100%', '0%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
