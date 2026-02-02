'use client';

import { useEffect, useRef, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);
  const originalTextRef = useRef(children);

  useEffect(() => {
    setMounted(true);
    originalTextRef.current = children;
  }, [children]);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

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

    // Store original content for cleanup
    const originalContent = container.innerHTML;

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
      gsap.to(splitElements, {
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
    }, container);

    return () => {
      ctx.revert();
      // Restore original content to prevent React unmount errors
      if (containerRef.current) {
        containerRef.current.innerHTML = originalContent;
      }
    };
  }, [children, type, animation, stagger, duration, delay, trigger, mounted]);

  // Use suppressHydrationWarning because we modify innerHTML
  return (
    <div
      ref={containerRef}
      className={className}
      style={{ perspective: '1000px' }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
