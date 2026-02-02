'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquare, Search, Code, Rocket, HeartHandshake } from 'lucide-react';
import GlowEffect from '@/components/effects/GlowEffect';
import SplitText from '@/components/effects/SplitText';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    icon: MessageSquare,
    title: 'Premier contact',
    description: 'Échange pour comprendre vos besoins, vos enjeux et vos objectifs. Gratuit et sans engagement.',
    color: 'from-accent-blue to-accent-cyan',
  },
  {
    icon: Search,
    title: 'Analyse & Audit',
    description: 'Étude approfondie de votre environnement existant et identification des axes d\'amélioration.',
    color: 'from-accent-cyan to-accent-blue',
  },
  {
    icon: Code,
    title: 'Conception & Développement',
    description: 'Mise en œuvre de la solution avec des points réguliers pour valider chaque étape.',
    color: 'from-accent-blue to-accent-cyan',
  },
  {
    icon: Rocket,
    title: 'Déploiement',
    description: 'Installation, configuration et mise en production avec formation de vos équipes.',
    color: 'from-accent-cyan to-accent-blue',
  },
  {
    icon: HeartHandshake,
    title: 'Accompagnement',
    description: 'Support continu, maintenance et évolutions pour garantir la pérennité de votre solution.',
    color: 'from-accent-blue to-accent-cyan',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current || !progressRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate the progress line
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden"
    >
      <GlowEffect className="top-1/3 right-0 translate-x-1/2" size="lg" />
      <GlowEffect className="bottom-1/3 left-0 -translate-x-1/2" color="cyan" size="md" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium mb-6"
          >
            Notre méthode
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            <SplitText animation="slide" type="words">
              Un accompagnement de A à Z
            </SplitText>
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Une méthodologie éprouvée pour garantir le succès de vos projets
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-dark-600 -translate-x-1/2">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-accent-blue to-accent-cyan origin-top"
            />
          </div>

          {/* Steps */}
          <div className="space-y-12 lg:space-y-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div
                      className={`inline-block p-6 rounded-2xl bg-dark-700/50 border border-dark-600 hover:border-accent-blue/30 transition-all duration-300 ${
                        isEven ? 'lg:ml-auto' : 'lg:mr-auto'
                      }`}
                    >
                      <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} p-0.5`}>
                          <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-light-100" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-light-100">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-light-200 leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-dark-800 border-4 border-dark-600 items-center justify-center z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.color}`}
                    />
                  </div>

                  {/* Step number (mobile) */}
                  <div className="lg:hidden absolute -left-2 top-0 w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
