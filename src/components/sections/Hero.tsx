'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import GlowEffect from '@/components/effects/GlowEffect';
import LogoReveal from '@/components/effects/LogoReveal';
import NeuralNetwork from '@/components/effects/NeuralNetwork';

gsap.registerPlugin(ScrollTrigger);

// Import dynamique du composant 3D avec fallback
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => null,
});

const HeroBackground = dynamic(() => import('@/components/three/HeroBackground'), {
  ssr: false,
  loading: () => null,
});

// Fallback CSS animé pour mobile ou si 3D échoue
function AnimatedFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient de base */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

      {/* Neural Network interactif */}
      <NeuralNetwork
        particleCount={60}
        connectionDistance={120}
        mouseRadius={180}
        speed={0.3}
      />

      {/* Grille animée CSS */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Orbes flottants */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          top: '10%',
          left: '20%',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          bottom: '20%',
          right: '15%',
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show3D, setShow3D] = useState(false);
  const [use3D, setUse3D] = useState(true);

  // Vérifier si on peut utiliser la 3D
  useEffect(() => {
    // Pas de 3D sur mobile ou si préférence reduced motion
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Vérifier le support WebGL
    const canvas = document.createElement('canvas');
    const hasWebGL = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );

    if (isMobile || prefersReduced || !hasWebGL) {
      setUse3D(false);
    }

    // Délai court avant d'afficher la 3D
    const timer = setTimeout(() => setShow3D(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Suivre la position de la souris (desktop uniquement)
  useEffect(() => {
    if (!use3D) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [use3D]);

  // Animations GSAP avec scrub
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      {/* Background 3D ou fallback */}
      {show3D && use3D ? (
        <div className="absolute inset-0">
          <Suspense fallback={<AnimatedFallback />}>
            <Scene className="!absolute">
              <HeroBackground mousePosition={mousePosition} />
            </Scene>
          </Suspense>
          {/* Neural Network overlay sur la 3D */}
          <NeuralNetwork
            className="z-10"
            particleCount={40}
            connectionDistance={100}
            mouseRadius={150}
            speed={0.2}
            particleColor="rgba(59, 130, 246, 0.6)"
            lineColor="rgba(59, 130, 246, 0.1)"
          />
        </div>
      ) : (
        <AnimatedFallback />
      )}

      {/* Glow effects */}
      <GlowEffect className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" size="lg" />
      <GlowEffect className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" color="cyan" size="md" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        {/* Logo SOCIALSOFT - tout en haut */}
        <div className="mb-16 relative z-20">
          <LogoReveal />
        </div>

        {/* Badge Île-de-France - sous le logo */}
        <motion.a
          href="#coverage"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-dark-700/50 border border-dark-600 text-light-200 text-sm backdrop-blur-sm hover:border-accent-blue/50 hover:bg-dark-600/50 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MapPin className="w-4 h-4 text-accent-blue" />
          <span>Interventions dans toute l&apos;Île-de-France</span>
        </motion.a>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-light-100 mb-6 leading-tight"
        >
          Votre IT, de la{' '}
          <span className="text-gradient">conception</span>
          <br />
          à l&apos;<span className="text-gradient">exploitation</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.6 }}
          className="text-lg sm:text-xl text-light-100 max-w-2xl mx-auto mb-10"
        >
          Accompagnement complet pour TPE et PME : conseil, développement, infrastructure, support.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#contact" size="lg">
            Demander un devis
          </Button>
          <Button href="#services" variant="secondary" size="lg">
            Découvrir nos services
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-light-100 hover:text-accent-blue transition-colors"
        >
          <span className="text-sm font-medium">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
