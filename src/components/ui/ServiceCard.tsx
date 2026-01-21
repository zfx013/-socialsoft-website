'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Service } from '@/lib/constants';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Throttle with requestAnimationFrame
    if (rafRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = clientX - centerX;
      const mouseY = clientY - centerY;

      // 3D tilt effect
      setRotateY((mouseX / rect.width) * 10);
      setRotateX(-(mouseY / rect.height) * 10);

      // Glow position
      const glowX = ((clientX - rect.left) / rect.width) * 100;
      const glowY = ((clientY - rect.top) / rect.height) * 100;
      setGlowPosition({ x: glowX, y: glowY });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setRotateX(0);
    setRotateY(0);
    setGlowPosition({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative p-8 lg:p-10 rounded-2xl bg-dark-800/80 backdrop-blur-sm border border-dark-600 hover:border-accent-blue/50 transition-all duration-300 h-full overflow-hidden"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={false}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
      >
        <motion.div
          className="absolute inset-[-1px] rounded-2xl"
          style={{
            background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5), rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.5), rgba(6, 182, 212, 0.5))',
          }}
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <div className="absolute inset-[1px] rounded-2xl bg-dark-800" />
      </motion.div>

      {/* Dynamic glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Scan line effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent"
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
      </AnimatePresence>

      {/* Glitch layers on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-screen"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, 2, -2, 2, 0],
                opacity: [0, 0.3, 0.3, 0.3, 0],
              }}
              transition={{
                duration: 0.2,
                delay: 0,
              }}
              style={{ backgroundColor: 'rgba(255, 0, 0, 0.05)' }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-screen"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, -2, 2, -2, 0],
                opacity: [0, 0.3, 0.3, 0.3, 0],
              }}
              transition={{
                duration: 0.2,
                delay: 0.05,
              }}
              style={{ backgroundColor: 'rgba(0, 255, 255, 0.05)' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Icon with 3D lift */}
      <div
        className="relative mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/10 text-accent-blue group-hover:from-accent-blue group-hover:to-accent-cyan group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent-blue/30"
        style={{ transform: 'translateZ(20px)' }}
      >
        <Icon className="w-8 h-8" />
        {/* Icon glow pulse */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-accent-cyan/20"
          animate={isHovered ? {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          } : { scale: 1, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Content with 3D lift */}
      <div style={{ transform: 'translateZ(10px)' }} className="relative">
        <h3 className="relative text-xl font-semibold text-light-100 mb-4 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="relative text-light-200 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom border glow - enhanced */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan"
        initial={{ width: 0, x: '-50%' }}
        animate={isHovered ? { width: '75%', x: '-50%' } : { width: 0, x: '-50%' }}
        transition={{ duration: 0.5 }}
      />

      {/* Corner accents - enhanced */}
      <motion.div
        className="absolute top-0 right-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent-cyan/50 rounded-tr-lg" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent-blue/50 rounded-bl-lg" />
      </motion.div>

      {/* Data particles on hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent-cyan rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: '100%',
                  opacity: 0,
                }}
                animate={{
                  y: '-20%',
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
