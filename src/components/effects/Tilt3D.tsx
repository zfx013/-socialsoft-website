'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 1-20, default 10
  glareEnabled?: boolean;
  glareMaxOpacity?: number;
  scale?: number; // Scale on hover, default 1.02
  perspective?: number; // Default 1000
}

export default function Tilt3D({
  children,
  className = '',
  intensity = 10,
  glareEnabled = true,
  glareMaxOpacity = 0.15,
  scale = 1.02,
  perspective = 1000,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse position
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring animation
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig);
  const scaleValue = useSpring(isHovered ? scale : 1, springConfig);

  // Glare position
  const glareX = useTransform(mouseX, [0, 1], ['-50%', '150%']);
  const glareY = useTransform(mouseY, [0, 1], ['-50%', '150%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale: scaleValue,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Glare effect */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="absolute w-[200%] h-[200%] rounded-full"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,${glareMaxOpacity}) 0%, transparent 50%)`,
                left: glareX,
                top: glareY,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </motion.div>
        )}

        {/* Shine line effect on edges */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `linear-gradient(
                105deg,
                transparent 40%,
                rgba(255, 255, 255, 0.03) 45%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.03) 55%,
                transparent 60%
              )`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// Version simplifiée pour les petits éléments
export function Tilt3DLight({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tilt3D
      className={className}
      intensity={5}
      glareEnabled={false}
      scale={1.01}
    >
      {children}
    </Tilt3D>
  );
}
