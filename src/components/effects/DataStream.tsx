'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface DataStreamProps {
  className?: string;
  opacity?: number;
  speed?: number;
  density?: number;
}

const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

interface StreamColumn {
  id: number;
  x: number;
  chars: string[];
  speed: number;
  opacity: number;
}

export default function DataStream({
  className = '',
  opacity = 0.15,
  speed = 1,
  density = 30,
}: DataStreamProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<StreamColumn[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    const columnCount = Math.floor(dimensions.width / (dimensions.width / density));
    const newColumns: StreamColumn[] = [];

    for (let i = 0; i < columnCount; i++) {
      const charCount = Math.floor(Math.random() * 15) + 10;
      const chars: string[] = [];

      for (let j = 0; j < charCount; j++) {
        chars.push(characters[Math.floor(Math.random() * characters.length)]);
      }

      newColumns.push({
        id: i,
        x: (i / columnCount) * 100,
        chars,
        speed: (Math.random() * 0.5 + 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.5,
      });
    }

    setColumns(newColumns);
  }, [dimensions, density, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      {columns.map((column) => (
        <StreamColumnComponent key={column.id} column={column} height={dimensions.height} />
      ))}
    </div>
  );
}

function StreamColumnComponent({ column, height }: { column: StreamColumn; height: number }) {
  const [chars, setChars] = useState(column.chars);

  useEffect(() => {
    // Changer aléatoirement les caractères
    const interval = setInterval(() => {
      setChars(prev =>
        prev.map((char, i) =>
          Math.random() > 0.9
            ? characters[Math.floor(Math.random() * characters.length)]
            : char
        )
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const duration = 8 / column.speed;

  return (
    <motion.div
      className="absolute text-xs font-mono leading-tight"
      style={{
        left: `${column.x}%`,
        opacity: column.opacity,
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
      }}
      initial={{ y: -200 }}
      animate={{ y: height + 200 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay: Math.random() * duration,
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="block"
          style={{
            color: i === 0 ? '#06B6D4' : i < 3 ? '#3B82F6' : '#1E3A5F',
            textShadow: i === 0 ? '0 0 10px #06B6D4' : 'none',
          }}
        >
          {char}
        </span>
      ))}
    </motion.div>
  );
}
