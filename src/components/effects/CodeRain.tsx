'use client';

import { useEffect, useRef, useState } from 'react';

interface CodeRainProps {
  className?: string;
  color?: string;
  speed?: number;
  density?: number;
  opacity?: number;
}

export default function CodeRain({
  className = '',
  color = '#06b6d4',
  speed = 1,
  density = 0.03,
  opacity = 0.15,
}: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Characters to display (mix of code-like characters)
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>{}[]()=+-*/&|!?;:._@#$%^~`';
    const charArray = chars.split('');

    let columns: number[] = [];
    let fontSize = 14;

    const initCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      const columnCount = Math.floor(canvas.width / fontSize);
      columns = Array(columnCount).fill(1).map(() => Math.random() * canvas.height / fontSize);
    };

    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = `rgba(10, 22, 40, ${0.05 * speed})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      columns.forEach((y, i) => {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;

        // Gradient from bright to dim
        const gradient = ctx.createLinearGradient(x, y * fontSize - fontSize * 10, x, y * fontSize);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.8, color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, color);

        // Draw character
        ctx.fillStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fillText(char, x, y * fontSize);

        // Head of the stream (brighter)
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
          ctx.fillText(char, x, y * fontSize);
        }

        // Reset or continue
        if (y * fontSize > canvas.height && Math.random() > 1 - density) {
          columns[i] = 0;
        } else {
          columns[i] = y + speed * 0.5;
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      initCanvas();
    };

    initCanvas();
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, speed, density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

// Version avec des vraies lignes de code - RÉÉCRIT en React pur (pas de manipulation DOM directe)
export function CodeStream({ className = '' }: { className?: string }) {
  const [lines, setLines] = useState<Array<{ id: number; text: string; top: number; duration: number }>>([]);
  const [mounted, setMounted] = useState(false);
  const nextId = useRef(0);

  const codeSnippets = [
    'const deploy = async () => {',
    '  await build();',
    '  return success;',
    '};',
    'function optimize(data) {',
    '  return data.map(x => x * 2);',
    '}',
    'npm install --save',
    'git commit -m "feat"',
    'docker-compose up -d',
    'SELECT * FROM users',
    'kubectl apply -f',
    'terraform plan',
    'import { useState }',
    'export default App;',
    'interface Props {',
    '  data: string[];',
    '}',
    'async function fetch() {',
    '  const res = await api();',
    '}',
  ];

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const createLine = () => {
      const id = nextId.current++;
      const duration = 15 + Math.random() * 10;
      setLines(prev => [...prev, {
        id,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        top: Math.random() * 100,
        duration,
      }]);

      // Remove line after animation completes
      setTimeout(() => {
        setLines(prev => prev.filter(line => line.id !== id));
      }, duration * 1000);
    };

    // Create initial lines
    const initialTimeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < 5; i++) {
      initialTimeouts.push(setTimeout(createLine, i * 2000));
    }

    // Continue creating lines
    const interval = setInterval(createLine, 3000);

    return () => {
      initialTimeouts.forEach(clearTimeout);
      clearInterval(interval);
      setLines([]); // Clean up all lines on unmount
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes slideCode {
          from {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateX(calc(100vw + 300px));
            opacity: 0;
          }
        }
      `}</style>
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {lines.map(line => (
          <div
            key={line.id}
            className="code-line"
            style={{
              position: 'absolute',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'rgba(6, 182, 212, 0.2)',
              whiteSpace: 'nowrap',
              animation: `slideCode ${line.duration}s linear forwards`,
              top: `${line.top}%`,
              left: '-300px',
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </>
  );
}
