'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scramble' | 'decode';
  scrub?: boolean | number;
  stagger?: number;
  glowColor?: 'cyan' | 'blue';
}

export default function TextReveal({
  children,
  className = '',
  animation = 'slide',
  scrub = false,
  stagger = 0.03,
  glowColor = 'cyan',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const text = textRef.current.innerText;
    const chars = text.split('');

    // Pour l'animation decode, on utilise une approche différente
    if (animation === 'decode') {
      const originalText = text;
      let hasTriggered = false;

      const decode = () => {
        if (hasTriggered) return;
        hasTriggered = true;
        setIsDecoding(true);

        let iteration = 0;
        const maxIterations = originalText.length * 3;

        const interval = setInterval(() => {
          if (!textRef.current) {
            clearInterval(interval);
            return;
          }

          textRef.current.innerHTML = originalText
            .split('')
            .map((char, index) => {
              if (char === ' ') return '&nbsp;';
              if (index < Math.floor(iteration / 3)) {
                return `<span class="text-glow-${glowColor}">${char}</span>`;
              }
              return `<span class="text-light-400">${scrambleChars[Math.floor(Math.random() * scrambleChars.length)]}</span>`;
            })
            .join('');

          iteration++;

          if (iteration > maxIterations) {
            clearInterval(interval);
            textRef.current.innerHTML = originalText
              .split('')
              .map(char => char === ' ' ? '&nbsp;' : `<span class="text-glow-${glowColor}">${char}</span>`)
              .join('');
            setIsDecoding(false);
          }
        }, 40);
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: decode,
      });

      return;
    }

    // Remplacer le texte par des spans pour chaque caractère
    textRef.current.innerHTML = chars
      .map((char) => {
        if (char === ' ') {
          return '<span class="inline-block">&nbsp;</span>';
        }
        return `<span class="inline-block opacity-0 translate-y-full">${char}</span>`;
      })
      .join('');

    const charElements = textRef.current.querySelectorAll('span');

    const ctx = gsap.context(() => {
      const animationProps: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger,
        ease: 'power3.out',
      };

      if (animation === 'fade') {
        gsap.set(charElements, { opacity: 0, y: 0 });
        animationProps.y = 0;
      } else if (animation === 'scramble') {
        gsap.set(charElements, { opacity: 0, scale: 0.5, rotation: -10 });
        animationProps.scale = 1;
        animationProps.rotation = 0;
      }

      gsap.to(charElements, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: scrub,
          toggleActions: scrub ? undefined : 'play none none reverse',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [animation, scrub, stagger, glowColor]);

  return (
    <div ref={containerRef} className={`${className} ${isDecoding ? 'decoding' : ''}`}>
      <span ref={textRef} className="inline-block">
        {children}
      </span>
      <style jsx>{`
        .text-glow-cyan {
          color: #06B6D4;
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        .text-glow-blue {
          color: #3B82F6;
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
