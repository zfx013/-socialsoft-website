'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  animation?: 'fade' | 'slide' | 'reveal' | 'wave';
  stagger?: number;
  duration?: number;
  delay?: number;
  trigger?: boolean;
}

export default function SplitText({
  children,
  className = '',
  type = 'words',
  animation = 'slide',
  stagger = 0.05,
  duration = 0.8,
  delay = 0,
  trigger = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const text = children;

    // Split text based on type
    let elements: string[] = [];
    if (type === 'chars') {
      elements = text.split('');
    } else if (type === 'words') {
      elements = text.split(' ');
    } else {
      elements = text.split('\n');
    }

    // Create spans
    container.innerHTML = elements
      .map((element, i) => {
        const content = type === 'words' ? element + (i < elements.length - 1 ? '&nbsp;' : '') : element;
        return `<span class="inline-block overflow-hidden"><span class="split-element inline-block">${content}</span></span>`;
      })
      .join(type === 'lines' ? '<br/>' : '');

    const splitElements = container.querySelectorAll('.split-element');

    // Animation configurations
    const animations: Record<string, gsap.TweenVars> = {
      fade: {
        opacity: 0,
      },
      slide: {
        opacity: 0,
        y: '100%',
      },
      reveal: {
        opacity: 0,
        y: '120%',
        rotationX: -80,
      },
      wave: {
        opacity: 0,
        y: 50,
        scale: 0.5,
      },
    };

    const animationTo: Record<string, gsap.TweenVars> = {
      fade: {
        opacity: 1,
      },
      slide: {
        opacity: 1,
        y: '0%',
      },
      reveal: {
        opacity: 1,
        y: '0%',
        rotationX: 0,
      },
      wave: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
    };

    gsap.set(splitElements, animations[animation]);

    const ctx = gsap.context(() => {
      const tl = gsap.to(splitElements, {
        ...animationTo[animation],
        duration,
        stagger: {
          each: stagger,
          ease: animation === 'wave' ? 'sine.inOut' : 'none',
        },
        ease: 'power3.out',
        delay,
        scrollTrigger: trigger
          ? {
              trigger: container,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          : undefined,
      });

      return () => tl.kill();
    }, container);

    return () => ctx.revert();
  }, [children, type, animation, stagger, duration, delay, trigger]);

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}
