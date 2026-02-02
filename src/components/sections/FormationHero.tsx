'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import { GraduationCap, Users, ArrowDown, CheckCircle, Phone, Award } from 'lucide-react';
import GlowEffect from '@/components/effects/GlowEffect';
import { siteStats, siteContact } from '@/lib/config';

const Hummingbirds = dynamic(() => import('@/components/three/Hummingbirds'), {
  ssr: false,
});

export default function FormationHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show3D, setShow3D] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center bg-dark-900 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Colibris 3D */}
      {show3D && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <Hummingbirds
                count={8}
                spread={10}
                mousePosition={mousePosition}
                fleeRadius={3}
                fleeStrength={1.5}
              />
            </Suspense>
          </Canvas>
        </div>
      )}

      <GlowEffect className="top-1/4 right-1/4" color="cyan" size="lg" />
      <GlowEffect className="bottom-1/3 left-1/4" color="blue" size="md" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Logo et texte */}
          <div className="text-center lg:text-left">
            {/* Logo Colibri */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <div className="relative w-24 h-32 sm:w-32 sm:h-40">
                <motion.div
                  className="absolute -inset-16 -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(16, 185, 129, 0.15) 40%, transparent 70%)',
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
                  src="/images/logo-colibri.png"
                  alt="Colibri - Organisme de Formation"
                  fill
                  className="object-contain relative z-10"
                  priority
                />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 mb-4"
            >
              <GraduationCap className="w-4 h-4" />
              Formation Colibri
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4"
            >
              Formations<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Certifiées Qualiopi
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-light-200 mb-6 leading-relaxed"
            >
              Montez en compétences sur les outils numériques avec nos formations professionnelles.
              Programmes adaptés à tous les niveaux, éligibles aux financements OPCO et CPF.
            </motion.p>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-light-100">Qualiopi</p>
                  <p className="text-sm text-light-400">certifié qualité</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-light-100">{siteStats.experience.value}+</p>
                  <p className="text-sm text-light-400">ans d&apos;expérience</p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <a
                href="#formations"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Découvrir nos formations
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href={siteContact.phoneLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-700 border border-dark-600 text-light-100 font-medium hover:border-emerald-500/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                {siteContact.phoneFormatted}
              </a>
            </motion.div>
          </div>

          {/* Carte Qualiopi - Formations financées */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="p-6 rounded-2xl bg-dark-800/70 backdrop-blur-sm border border-dark-600">
              {/* Logo Qualiopi cliquable */}
              <a
                href="https://travail-emploi.gouv.fr/qualiopi-marque-de-certification-qualite-des-prestataires-de-formation"
                target="_blank"
                rel="noopener noreferrer"
                className="group block mb-5"
              >
                <div className="relative w-full rounded-xl overflow-hidden border-2 border-transparent group-hover:border-emerald-500/50 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Image
                    src="/images/logo-qualiopi.png"
                    alt="Certification Qualiopi - La certification qualité a été délivrée au titre des catégories d'actions suivantes : Actions de formation"
                    width={400}
                    height={180}
                    className="object-contain w-full h-auto rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </a>

              {/* Titre et description */}
              <h3 className="text-lg font-semibold text-light-100 mb-2">
                Formations certifiées
              </h3>
              <p className="text-sm text-light-300 mb-4 leading-relaxed">
                Notre organisme est certifié Qualiopi, garantissant la qualité de nos formations et leur éligibilité aux financements publics.
              </p>

              {/* Liste des avantages */}
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-light-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Prise en charge OPCO
                </li>
                <li className="flex items-center gap-2 text-sm text-light-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Éligible CPF
                </li>
                <li className="flex items-center gap-2 text-sm text-light-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Plan de formation entreprise
                </li>
                <li className="flex items-center gap-2 text-sm text-light-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Aide individuelle à la formation
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#avantages"
        initial={{ opacity: 0 }}
        animate={{ opacity: mounted ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-light-100 hover:text-emerald-400 transition-colors"
      >
        <span className="text-sm font-medium">Découvrir</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}
