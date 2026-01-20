'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface HoverDistortionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glitchOnHover?: boolean;
}

export default function HoverDistortion({
  children,
  className = '',
  intensity = 1,
  glitchOnHover = true,
}: HoverDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchKey, setGlitchKey] = useState(0);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * 5 * intensity;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * -5 * intensity;

    setTransform({
      rotateX,
      rotateY,
      scale: 1.02,
    });
  }, [intensity]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (glitchOnHover) {
      setGlitchKey(prev => prev + 1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0, scale: 1 });
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
        scale: transform.scale,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Main content */}
      <div className="relative">
        {children}
      </div>

      {/* Glitch layers */}
      {isHovered && glitchOnHover && (
        <>
          <GlitchLayer key={`r-${glitchKey}`} color="rgba(255, 0, 0, 0.1)" offset={2} />
          <GlitchLayer key={`c-${glitchKey}`} color="rgba(0, 255, 255, 0.1)" offset={-2} />
        </>
      )}

      {/* Scan line effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent"
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

function GlitchLayer({ color, offset }: { color: string; offset: number }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      initial={{ x: 0, opacity: 0 }}
      animate={{
        x: [0, offset, -offset, offset, 0],
        opacity: [0, 0.8, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 0.2,
        times: [0, 0.2, 0.4, 0.6, 1],
      }}
      style={{ backgroundColor: color }}
    />
  );
}
