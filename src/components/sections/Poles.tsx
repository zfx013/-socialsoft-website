'use client';

import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Code, GraduationCap, ArrowRight, Wifi, Shield, Monitor, Smartphone, Cloud, Laptop, HardDrive, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { poles } from '@/lib/config';

const iconMap = {
  Server,
  Code,
  GraduationCap,
} as const;

type IconKey = keyof typeof iconMap;

// Import dynamique pour les oiseaux 3D
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const Hummingbirds = dynamic(() => import('@/components/three/Hummingbirds'), { ssr: false });

// ============================================
// TERMINAL ANIMÉ - Code qui défile en continu
// ============================================
const CODE_SNIPPETS = [
  '$ git clone projet-client',
  '$ npm install',
  '$ npm run dev',
  '',
  'import { useState } from "react"',
  'import { motion } from "framer-motion"',
  '',
  'export default function App() {',
  '  const [loading, setLoading] = useState(true)',
  '',
  '  useEffect(() => {',
  '    fetchData().then(setData)',
  '  }, [])',
  '',
  '  return (',
  '    <main className="app">',
  '      <Header />',
  '      <Dashboard data={data} />',
  '      <Footer />',
  '    </main>',
  '  )',
  '}',
  '',
  '// API Integration',
  'async function fetchData() {',
  '  const res = await fetch("/api")',
  '  return res.json()',
  '}',
  '',
  '✓ Build successful',
  '✓ Deployed to production',
  '',
];

function AnimatedTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: '-50px' });

  return (
    <div ref={terminalRef} className="relative w-full max-w-lg mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-dark-600">
        {/* Title bar */}
        <div className="bg-dark-700 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-light-400 ml-2 font-mono">terminal — projet-client</span>
        </div>

        {/* Terminal content avec défilement CSS */}
        <div className="bg-dark-900 p-4 h-80 overflow-hidden font-mono text-sm relative">
          {/* Conteneur qui défile */}
          <div
            className={`terminal-scroll ${isInView ? 'animate-terminal-scroll' : ''}`}
            style={{ opacity: isInView ? 1 : 0 }}
          >
            {/* Dupliquer les lignes pour un défilement infini */}
            {[...CODE_SNIPPETS, ...CODE_SNIPPETS].map((line, i) => (
              <div
                key={i}
                className={`leading-relaxed ${
                  line.startsWith('$') ? 'text-green-400' :
                  line.startsWith('✓') ? 'text-emerald-400' :
                  line.startsWith('//') ? 'text-light-500' :
                  line.includes('import') || line.includes('export') || line.includes('const') || line.includes('return') || line.includes('async') || line.includes('function') ? 'text-violet-400' :
                  line.includes('className') || line.includes('<') ? 'text-cyan-400' :
                  'text-light-300'
                }`}
              >
                {line || '\u00A0'}
              </div>
            ))}
          </div>

          {/* Curseur clignotant */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse" />
          </div>

          {/* Dégradé en haut et en bas pour effet de fondu */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-dark-900 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Style pour l'animation */}
      <style jsx>{`
        @keyframes terminal-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-terminal-scroll {
          animation: terminal-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

// ============================================
// IT VISUAL - Services IT pour toutes tailles
// ============================================
function ITServicesVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Services IT représentant tous types de clients
  const services = [
    { icon: Laptop, label: 'Postes', color: 'from-blue-500 to-blue-600', delay: 0 },
    { icon: Monitor, label: 'Écrans', color: 'from-cyan-500 to-cyan-600', delay: 0.1 },
    { icon: Smartphone, label: 'Mobile', color: 'from-violet-500 to-violet-600', delay: 0.2 },
    { icon: Wifi, label: 'Réseau', color: 'from-emerald-500 to-emerald-600', delay: 0.3 },
    { icon: Shield, label: 'Sécurité', color: 'from-amber-500 to-amber-600', delay: 0.4 },
    { icon: Cloud, label: 'Cloud', color: 'from-sky-500 to-sky-600', delay: 0.5 },
    { icon: HardDrive, label: 'Stockage', color: 'from-pink-500 to-pink-600', delay: 0.6 },
    { icon: Lock, label: 'Données', color: 'from-indigo-500 to-indigo-600', delay: 0.7 },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto">
      {/* Grille de services */}
      <div className="grid grid-cols-4 gap-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 transition-all duration-500"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
                transitionDelay: `${service.delay}s`,
              }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-default`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-light-400 font-medium">{service.label}</span>
            </div>
          );
        })}
      </div>

      {/* Lignes de connexion animées */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="itGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Lignes de connexion entre les icônes */}
        {isInView && (
          <>
            <line x1="25%" y1="25%" x2="75%" y2="25%" stroke="url(#itGradient)" strokeWidth="1" className="animate-pulse" />
            <line x1="25%" y1="75%" x2="75%" y2="75%" stroke="url(#itGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
            <line x1="25%" y1="25%" x2="25%" y2="75%" stroke="url(#itGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1s' }} />
            <line x1="75%" y1="25%" x2="75%" y2="75%" stroke="url(#itGradient)" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
          </>
        )}
      </svg>

      {/* Badge central */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full bg-dark-800/90 border border-blue-500/30 backdrop-blur-sm transition-all duration-700"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)',
          transitionDelay: '0.8s',
        }}
      >
        <span className="text-sm font-medium text-blue-400">De 1 à 250 postes</span>
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

// ============================================
// COLIBRI VISUAL - Oiseaux 3D + Logo Qualiopi
// ============================================
function ColibriVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative w-full max-w-sm mx-auto h-80">
      {/* Oiseaux 3D en arrière-plan */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: isInView ? 1 : 0 }}
      >
        <Suspense fallback={null}>
          <Scene className="!absolute inset-0">
            <Hummingbirds count={5} spread={4} />
          </Scene>
        </Suspense>
      </div>

      {/* Logo Colibri au centre */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-700"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'scale(1)' : 'scale(0.8)',
          transitionDelay: '0.3s',
        }}
      >
        <div className="relative">
          {/* Glow derrière le logo */}
          <div
            className="absolute inset-0 -m-8 animate-pulse-slow"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
            }}
          />

          {/* Logo */}
          <div className="relative w-32 h-44">
            <Image
              src="/images/logo-colibri.png"
              alt="Formation Colibri"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Badge Qualiopi */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-dark-800/90 border border-emerald-500/40 backdrop-blur-sm transition-all duration-500"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
          transitionDelay: '0.6s',
        }}
      >
        <span className="text-sm font-semibold text-emerald-400">✓ Certifié Qualiopi</span>
      </div>
    </div>
  );
}

// ============================================
// POLE SECTION
// ============================================
interface PoleSectionProps {
  pole: typeof poles[0];
  index: number;
  isReversed: boolean;
}

function PoleSection({ pole, index, isReversed }: PoleSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const Icon = iconMap[pole.icon as IconKey] || Server;

  const colors = {
    it: {
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    dev: {
      gradient: 'from-violet-500 to-purple-500',
      bgGlow: 'bg-violet-500/10',
      text: 'text-violet-400',
      border: 'border-violet-500/30',
    },
    formation: {
      gradient: 'from-emerald-500 to-teal-500',
      bgGlow: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
    },
  };

  const poleColors = colors[pole.id as keyof typeof colors] || colors.it;

  // Rendu du visuel spécifique à chaque pôle
  const renderVisual = () => {
    switch (pole.id) {
      case 'it':
        return <ITServicesVisual />;
      case 'dev':
        return <AnimatedTerminal />;
      case 'formation':
        return <ColibriVisual />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`relative py-20 lg:py-32 ${index % 2 === 0 ? 'bg-dark-900' : 'bg-dark-800'}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute ${isReversed ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 w-[600px] h-[600px] ${poleColors.bgGlow} rounded-full blur-3xl opacity-30`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className={isReversed ? 'lg:order-2' : ''}
          >
            {/* Icône et titre */}
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${poleColors.gradient} flex items-center justify-center`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-light-100">
                  {pole.title}
                </h3>
                <p className={`text-sm font-medium ${poleColors.text}`}>
                  {pole.subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-light-200 mb-8 leading-relaxed">
              {pole.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 mb-8">
              {pole.features.map((feature, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className={`px-4 py-2 text-sm font-medium rounded-xl bg-dark-700/50 text-light-200 border ${poleColors.border}`}
                >
                  {feature}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={pole.href}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${poleColors.gradient} text-white font-medium hover:opacity-90 transition-opacity group`}
            >
              Découvrir
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Visuel spécifique */}
          <motion.div
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={isReversed ? 'lg:order-1' : ''}
          >
            {renderVisual()}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Poles() {
  return (
    <section id="poles" className="relative overflow-hidden">
      {/* Header */}
      <div className="relative py-16 lg:py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4"
          >
            Nos domaines d&apos;intervention
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-light-200 max-w-2xl mx-auto"
          >
            Une expertise complète pour accompagner votre entreprise dans tous ses projets IT
          </motion.p>
        </div>
      </div>

      {/* Sections des pôles */}
      {poles.map((pole, index) => (
        <PoleSection
          key={pole.id}
          pole={pole}
          index={index}
          isReversed={index % 2 !== 0}
        />
      ))}
    </section>
  );
}
