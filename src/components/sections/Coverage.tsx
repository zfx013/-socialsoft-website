'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowEffect from '@/components/effects/GlowEffect';
import IdfMap from '@/components/ui/IdfMap';
import DataStream from '@/components/effects/DataStream';
import SectionTransition from '@/components/effects/SectionTransition';

gsap.registerPlugin(ScrollTrigger);

export default function Coverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden"
    >
      {/* Data stream background effect */}
      <DataStream opacity={0.08} density={25} />

      <GlowEffect className="top-1/2 right-1/4 -translate-y-1/2" size="lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div ref={contentRef}>
            <SectionTransition animation="slide-right">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-6">
                Zone d&apos;intervention{' '}
                <span className="text-gradient">Île-de-France</span>
              </h2>
            </SectionTransition>
            <SectionTransition animation="fade" delay={0.2}>
              <p className="text-lg text-light-200 mb-8">
                Basés à Saint-Ouen-l&apos;Aumône, nous intervenons sur site dans toute
                l&apos;Île-de-France pour l&apos;infrastructure et le support. Pour le
                développement logiciel, nous accompagnons des clients dans le monde entier.
              </p>
            </SectionTransition>

            <div className="space-y-4">
              {/* Intervention sur site */}
              <SectionTransition animation="slide-up" delay={0.3}>
                <div className="p-4 rounded-xl bg-dark-700/50 border border-accent-cyan/30 hover:border-accent-cyan/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-accent-cyan animate-pulse"></div>
                    <span className="text-accent-cyan font-semibold">Intervention sur site</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <span className="text-light-100 font-medium">Val-d&apos;Oise (95)</span>
                      <span className="text-light-400 block">Infrastructure, Support</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-light-100 font-medium">Île-de-France</span>
                      <span className="text-light-400 block">Réseaux, Sécurité</span>
                    </div>
                  </div>
                </div>
              </SectionTransition>

              {/* Développement */}
              <SectionTransition animation="slide-up" delay={0.4}>
                <div className="p-4 rounded-xl bg-dark-700/50 border border-accent-blue/30 hover:border-accent-blue/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-accent-blue animate-pulse"></div>
                    <span className="text-accent-blue font-semibold">Développement logiciel</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <span className="text-light-100 font-medium">Monde entier</span>
                      <span className="text-light-400 block">Logiciels métiers</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-light-100 font-medium">À distance</span>
                      <span className="text-light-400 block">Sites web & Apps</span>
                    </div>
                  </div>
                </div>
              </SectionTransition>

            </div>
          </div>

          {/* Carte IDF futuriste */}
          <SectionTransition animation="slide-left" delay={0.2}>
            <div className="relative h-[400px] lg:h-[500px] bg-dark-900/50 rounded-2xl border border-dark-700/50 overflow-hidden">
              <IdfMap />
            </div>
          </SectionTransition>
        </div>
      </div>
    </section>
  );
}
