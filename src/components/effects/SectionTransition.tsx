'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'reveal';
  delay?: number;
  duration?: number;
  once?: boolean;
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  'slide-left': {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  reveal: {
    initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
};

export default function SectionTransition({
  children,
  className = '',
  animation = 'slide-up',
  delay = 0,
  duration = 0.6,
  once = true,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// Divider animé entre sections
interface SectionDividerProps {
  className?: string;
  variant?: 'line' | 'dots' | 'gradient' | 'wave';
}

export function SectionDivider({ className = '', variant = 'gradient' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  if (variant === 'line') {
    return (
      <div ref={ref} className={`relative py-12 ${className}`}>
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-accent-cyan/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div ref={ref} className={`flex justify-center gap-2 py-12 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-accent-cyan/50"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'wave') {
    return (
      <div ref={ref} className={`relative h-24 overflow-hidden ${className}`}>
        <motion.svg
          viewBox="0 0 1200 120"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,40 1200,60 L1200,120 L0,120 Z"
            fill="url(#waveGradient)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  // Default: gradient
  return (
    <div ref={ref} className={`relative py-16 ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
