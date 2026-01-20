'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  glowColor?: 'cyan' | 'blue';
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
  glowColor = 'cyan',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Si la valeur est un string (comme "24/7"), on utilise un effet différent
  const isStringValue = typeof value === 'string';
  const numericValue = isStringValue ? 0 : value;

  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView && !hasAnimated && !isStringValue) {
      spring.set(numericValue);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, numericValue, spring, isStringValue]);

  // Classes de glow
  const glowClasses = glowColor === 'cyan'
    ? 'text-accent-cyan drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]'
    : 'text-accent-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]';

  if (isStringValue) {
    return (
      <div ref={ref} className={className}>
        <SlotMachineText
          text={value as string}
          isInView={isInView}
          prefix={prefix}
          suffix={suffix}
          glowClasses={glowClasses}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <span className={glowClasses}>
        {prefix}
        <motion.span>{display}</motion.span>
        {suffix}
      </span>
    </div>
  );
}

// Composant pour l'effet slot machine sur les strings
function SlotMachineText({
  text,
  isInView,
  prefix,
  suffix,
  glowClasses,
}: {
  text: string;
  isInView: boolean;
  prefix: string;
  suffix: string;
  glowClasses: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    const chars = '0123456789/';
    let iteration = 0;
    const maxIterations = text.length * 8;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < Math.floor(iteration / 8)) {
              return char;
            }
            if (char === '/') return '/';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;

      if (iteration > maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, text, hasAnimated]);

  return (
    <motion.span
      className={glowClasses}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      {displayText || text}
      {suffix}
    </motion.span>
  );
}
