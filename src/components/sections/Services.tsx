'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/lib/constants';
import ServiceCard from '@/components/ui/ServiceCard';
import GlowEffect from '@/components/effects/GlowEffect';
import { CodeStream } from '@/components/effects/CodeRain';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const setupAnimations = useCallback(() => {
    if (!sectionRef.current || !scrollerRef.current || !titleRef.current) return;

    // Nettoyer les anciennes animations
    if (ctxRef.current) {
      ctxRef.current.revert();
    }
    ScrollTrigger.refresh();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.innerWidth >= 1024;

    ctxRef.current = gsap.context(() => {
      // Animation du titre (commune)
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      if (isDesktop) {
        // Desktop: scroll horizontal avec pin
        const scrollWidth = scrollerRef.current!.scrollWidth;
        const viewportWidth = sectionRef.current!.offsetWidth;
        // Augmenter la distance pour voir la dernière carte complètement
        const distance = scrollWidth - viewportWidth + 500;

        gsap.to(scrollerRef.current, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 20%',
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      } else {
        // Mobile: animation staggered des cartes
        const cards = scrollerRef.current!.querySelectorAll('.service-card-wrapper');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                end: 'top 75%',
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);
  }, []);

  useEffect(() => {
    // Petit délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(setupAnimations, 100);

    // Re-setup sur resize (avec debounce)
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setupAnimations, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, [setupAnimations]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative pt-16 pb-8 lg:pt-32 lg:pb-12 bg-dark-900 overflow-hidden"
    >
      {/* Background glow */}
      <GlowEffect className="top-0 right-0 -translate-y-1/2 translate-x-1/2" size="lg" />
      <GlowEffect className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2" color="cyan" size="md" />

      {/* Code stream subtil en arrière-plan */}
      <CodeStream className="opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div ref={titleRef} className="mb-10 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            Nos services
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Une offre complète pour accompagner votre transformation digitale
          </p>
        </div>

        {/* Cartes: CSS media queries pour le layout (pas de JS state) */}
        <div
          ref={scrollerRef}
          className="
            grid grid-cols-1 sm:grid-cols-2 gap-6
            lg:flex lg:gap-8 lg:will-change-transform lg:pr-[400px]
            pb-8
          "
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card-wrapper lg:flex-shrink-0 lg:w-96"
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
