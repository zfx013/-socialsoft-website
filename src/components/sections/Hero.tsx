'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';
import GlowEffect from '@/components/effects/GlowEffect';
import { trackEvent } from '@/lib/tracking';
import LogoReveal from '@/components/effects/LogoReveal';
import NeuralNetwork from '@/components/effects/NeuralNetwork';

// Register plugin once with SSR check
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
        className="absolute inset-0 opacity-10 pointer-events-none animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
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
        initial={false}
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
        initial={false}
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
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [use3D, setUse3D] = useState(false);

  // Montage et vérification 3D
  useEffect(() => {
    setMounted(true);

    // Pas de 3D sur mobile ou si préférence reduced motion
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Vérifier le support WebGL
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      hasWebGL = false;
    }

    if (!isMobile && !prefersReduced && hasWebGL) {
      setUse3D(true);
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
      {/* Background - toujours le fallback pour SSR */}
      <AnimatedFallback />

      {/* 3D overlay uniquement après montage */}
      {mounted && show3D && use3D && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
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
        <div className="mb-20 relative z-20">
          <LogoReveal />
        </div>

        {/* Heading */}
        <motion.h1
          initial={false}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-light-100 mb-8 leading-tight"
        >
          Votre IT, de la{' '}
          <span className="text-gradient">conception</span>
          <br />
          à l&apos;<span className="text-gradient">exploitation</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={false}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-light-100 max-w-2xl mx-auto mb-12"
        >
          Accompagnement complet pour TPE, PME et Associations : conseil, développement, infrastructure, support.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={false}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="#contact" size="lg" onClickTrack={() => trackEvent('contact_click')}>
            Demander un devis
          </Button>
          <Button href="#services" variant="secondary" size="lg">
            Découvrir nos services
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#services"
          initial={false}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
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
