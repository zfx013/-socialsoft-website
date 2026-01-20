'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlowEffectProps {
  className?: string;
  color?: 'blue' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
}

export default function GlowEffect({
  className = '',
  color = 'blue',
  size = 'md',
}: GlowEffectProps) {
  const prefersReducedMotion = useReducedMotion();

  const colors = {
    blue: 'bg-accent-blue/20',
    cyan: 'bg-accent-cyan/20',
  };

  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
  };

  return (
    <div
      className={`absolute rounded-full blur-3xl ${colors[color]} ${sizes[size]} ${className} ${
        prefersReducedMotion ? '' : 'animate-pulse-glow'
      }`}
      style={{ filter: 'blur(60px)' }}
    />
  );
}
