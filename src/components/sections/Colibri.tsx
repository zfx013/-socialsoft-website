'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { GraduationCap, Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import GlowEffect from '@/components/effects/GlowEffect';
import SectionTransition from '@/components/effects/SectionTransition';

// Import dynamique des colibris 3D
const Hummingbirds = dynamic(() => import('@/components/three/Hummingbirds'), {
  ssr: false,
});

const features = [
  {
    icon: BookOpen,
    title: 'Formations variées',
    description: "De l'informatique à l'éducation sociale, des programmes adaptés à vos besoins.",
  },
  {
    icon: Users,
    title: 'Approche personnalisée',
    description: 'Chaque formation est adaptée aux besoins spécifiques de vos équipes.',
  },
  {
    icon: Award,
    title: 'Formateurs experts',
    description: 'Une équipe qualifiée et expérimentée au service de votre réussite.',
  },
  {
    icon: GraduationCap,
    title: 'Pédagogie moderne',
    description: "Des méthodes engageantes qui facilitent l'apprentissage.",
  },
];

export default function Colibri() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Check for WebGL support and reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!prefersReduced && !isMobile) {
      setShow3D(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <section
      id="colibri"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden"
    >
      {/* Colibris 3D en arrière-plan */}
      {show3D && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <Hummingbirds
                count={6}
                spread={7}
                mousePosition={mousePosition}
                fleeRadius={3}
                fleeStrength={1.5}
              />
            </Suspense>
          </Canvas>
        </div>
      )}

      <GlowEffect className="top-1/4 right-1/4" color="cyan" size="lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Logo et description */}
          <SectionTransition animation="slide-right">
            <div className="text-center lg:text-left">
              {/* Logo Colibri */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                className="mb-8 flex justify-center lg:justify-start"
              >
                <div className="relative w-32 h-40 sm:w-40 sm:h-48">
                  {/* Glow effect behind logo */}
                  <motion.div
                    className="absolute -inset-16 -z-10"
                    style={{
                      background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <Image
                    src="/images/logo-colibri.webp"
                    alt="Colibri - Organisme de Formation"
                    fill
                    className="object-contain relative z-10"
                  />
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, amount: 0.5 }}
                className="inline-block px-4 py-2 rounded-full bg-accent-cyan/10 text-accent-cyan text-sm font-medium mb-6"
              >
                Organisme de Formation
              </motion.span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-6">
                Formez vos équipes avec{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">
                  Colibri
                </span>
              </h2>

              <p className="text-lg text-light-200 mb-8">
                Notre organisme de formation aide les entreprises et Associations à renforcer
                les compétences de leurs équipes. Des formations sur mesure, dispensées par
                des experts, dans une atmosphère propice à l'apprentissage.
              </p>

              <motion.a
                href="https://colibri.socialsoft.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-blue text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Découvrir Colibri
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </SectionTransition>

          {/* Features */}
          <SectionTransition animation="slide-left" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="p-5 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-accent-cyan/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-4 group-hover:bg-accent-cyan/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-light-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-light-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </SectionTransition>
        </div>
      </div>
    </section>
  );
}
