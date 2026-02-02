'use client';

import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Code, GraduationCap, ArrowRight } from 'lucide-react';
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
// TERMINAL ANIMÉ - Effet de frappe réaliste
// ============================================
const TYPING_LINES = [
  { text: '$ npm create next-app client', type: 'command' },
  { text: '✓ Projet créé avec succès', type: 'success' },
  { text: '$ cd client && npm install', type: 'command' },
  { text: '$ npm run dev', type: 'command' },
  { text: '', type: 'empty' },
  { text: 'import React from "react"', type: 'code' },
  { text: 'import { Database } from "./db"', type: 'code' },
  { text: '', type: 'empty' },
  { text: 'export default function App() {', type: 'keyword' },
  { text: '  const data = useQuery()', type: 'code' },
  { text: '  return <Dashboard />', type: 'jsx' },
  { text: '}', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '✓ Build successful', type: 'success' },
  { text: '✓ Deployed to production', type: 'success' },
];

function AnimatedTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: '-50px' });

  // Calculer le délai total pour chaque ligne (basé sur les lignes précédentes)
  const getLineDelay = (index: number) => {
    let delay = 0;
    for (let i = 0; i < index; i++) {
      delay += TYPING_LINES[i].text.length * 0.05 + 0.8; // temps de frappe + pause
    }
    return delay;
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-green-400';
      case 'success': return 'text-emerald-400';
      case 'keyword': return 'text-violet-400';
      case 'jsx': return 'text-cyan-400';
      case 'code': return 'text-light-300';
      default: return 'text-light-300';
    }
  };

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

        {/* Terminal content avec effet de frappe */}
        <div className="bg-dark-900 p-4 h-80 overflow-hidden font-mono text-sm">
          {TYPING_LINES.map((line, i) => (
            <div
              key={i}
              className={`typing-line ${getLineColor(line.type)} h-6 overflow-hidden`}
              style={{
                opacity: isInView ? 1 : 0,
                animationDelay: isInView ? `${getLineDelay(i)}s` : '0s',
              }}
            >
              <span
                className="typing-text inline-block whitespace-pre"
                style={{
                  animationDelay: isInView ? `${getLineDelay(i)}s` : '0s',
                  animationDuration: `${line.text.length * 0.05}s`,
                }}
              >
                {line.text || '\u00A0'}
              </span>
            </div>
          ))}

          {/* Curseur qui suit la frappe */}
          <span className="inline-block w-2 h-4 bg-green-400 animate-blink ml-1" />
        </div>
      </div>

      {/* Styles pour l'animation de frappe */}
      <style jsx>{`
        .typing-line {
          animation: fadeIn 0.1s ease forwards;
          opacity: 0;
        }
        .typing-text {
          overflow: hidden;
          animation: typing 0.5s steps(40, end) forwards;
          width: 0;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}

// ============================================
// IT VISUAL - Salle serveur 3D isométrique
// ============================================
function ServerRoomVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Configuration des racks serveur
  const racks = [
    { id: 1, x: -120, z: 0, delay: 0 },
    { id: 2, x: 0, z: 40, delay: 0.2 },
    { id: 3, x: 120, z: 0, delay: 0.4 },
  ];

  // LEDs par serveur (8 serveurs par rack)
  const serverUnits = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto h-96 perspective-1000">
      {/* Sol avec grille */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 h-40 transition-all duration-1000"
        style={{
          transform: `translateX(-50%) rotateX(60deg) rotateZ(-45deg)`,
          background: `
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: isInView ? 1 : 0,
          transitionDelay: '0.2s',
        }}
      />

      {/* Container isométrique */}
      <div
        className="absolute top-1/2 left-1/2 transition-all duration-1000"
        style={{
          transform: 'translate(-50%, -50%) rotateX(15deg) rotateY(-25deg)',
          transformStyle: 'preserve-3d',
          opacity: isInView ? 1 : 0,
        }}
      >
        {/* Racks serveur */}
        {racks.map((rack) => (
          <div
            key={rack.id}
            className="server-rack absolute transition-all duration-700"
            style={{
              transform: `translateX(${rack.x}px) translateZ(${rack.z}px)`,
              transformStyle: 'preserve-3d',
              opacity: isInView ? 1 : 0,
              transitionDelay: `${rack.delay}s`,
            }}
          >
            {/* Corps du rack */}
            <div className="relative w-20 h-56 bg-gradient-to-b from-dark-600 to-dark-800 rounded-lg border border-dark-500 shadow-2xl">
              {/* Face avant avec serveurs */}
              <div className="absolute inset-1 flex flex-col gap-1 p-1">
                {serverUnits.map((unit) => (
                  <div
                    key={unit}
                    className="server-unit relative h-6 bg-dark-700 rounded border border-dark-500 flex items-center px-2 gap-1"
                  >
                    {/* LEDs status */}
                    <div
                      className="led w-1.5 h-1.5 rounded-full bg-emerald-400"
                      style={{
                        animation: isInView ? `led-blink 2s ease-in-out infinite` : 'none',
                        animationDelay: `${rack.delay + unit * 0.15}s`,
                      }}
                    />
                    <div
                      className="led w-1.5 h-1.5 rounded-full bg-blue-400"
                      style={{
                        animation: isInView ? `led-pulse 1.5s ease-in-out infinite` : 'none',
                        animationDelay: `${rack.delay + unit * 0.1 + 0.5}s`,
                      }}
                    />
                    <div
                      className="led w-1.5 h-1.5 rounded-full bg-amber-400"
                      style={{
                        animation: isInView ? `led-blink 3s ease-in-out infinite` : 'none',
                        animationDelay: `${rack.delay + unit * 0.2}s`,
                      }}
                    />
                    {/* Ventilation slots */}
                    <div className="flex-1 flex justify-end gap-0.5">
                      {[0, 1, 2, 3].map((slot) => (
                        <div key={slot} className="w-0.5 h-3 bg-dark-600 rounded-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Glow du rack */}
              <div
                className="absolute -inset-2 bg-blue-500/20 rounded-xl blur-xl -z-10"
                style={{
                  animation: isInView ? 'rack-glow 3s ease-in-out infinite' : 'none',
                  animationDelay: `${rack.delay}s`,
                }}
              />
            </div>

            {/* Câbles réseau */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-transparent rounded-full opacity-60" />
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-60" />
              <div className="w-1 h-7 bg-gradient-to-b from-emerald-500 to-transparent rounded-full opacity-60" />
            </div>
          </div>
        ))}

        {/* Connexions réseau animées entre les racks */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 pointer-events-none" style={{ transform: 'translate(-50%, 100%)' }}>
          <defs>
            <linearGradient id="cable-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {/* Câble gauche-centre */}
          <path
            d="M 40 10 Q 120 40 160 10"
            stroke="url(#cable-gradient)"
            strokeWidth="2"
            fill="none"
            className="cable-path"
            style={{
              strokeDasharray: '200',
              strokeDashoffset: isInView ? '0' : '200',
              transition: 'stroke-dashoffset 1.5s ease-out',
              transitionDelay: '0.8s',
            }}
          />
          {/* Câble centre-droite */}
          <path
            d="M 160 10 Q 200 40 280 10"
            stroke="url(#cable-gradient)"
            strokeWidth="2"
            fill="none"
            className="cable-path"
            style={{
              strokeDasharray: '200',
              strokeDashoffset: isInView ? '0' : '200',
              transition: 'stroke-dashoffset 1.5s ease-out',
              transitionDelay: '1s',
            }}
          />
          {/* Data packets animés */}
          {isInView && (
            <>
              <circle r="3" fill="#06b6d4" className="data-packet">
                <animateMotion dur="2s" repeatCount="indefinite" begin="0s">
                  <mpath href="#packet-path-1" />
                </animateMotion>
              </circle>
              <circle r="3" fill="#3b82f6" className="data-packet">
                <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
                  <mpath href="#packet-path-2" />
                </animateMotion>
              </circle>
            </>
          )}
          <path id="packet-path-1" d="M 40 10 Q 120 40 160 10" fill="none" />
          <path id="packet-path-2" d="M 160 10 Q 200 40 280 10" fill="none" />
        </svg>
      </div>

      {/* Effet de lumière ambiante */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent" />
      </div>

      {/* Label */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-dark-800/90 border border-blue-500/30 backdrop-blur-sm transition-all duration-500"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
          transitionDelay: '0.8s',
        }}
      >
        <span className="text-sm font-medium text-blue-400">Infrastructure supervisée 24/7</span>
      </div>

      {/* Styles pour animations */}
      <style jsx>{`
        @keyframes led-blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px currentColor; }
          50% { opacity: 0.3; box-shadow: none; }
        }
        @keyframes led-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; box-shadow: 0 0 8px currentColor; }
        }
        @keyframes rack-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .data-packet {
          filter: drop-shadow(0 0 4px currentColor);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
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
    <div ref={ref} className="relative w-full max-w-md mx-auto h-96">
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

      {/* Logo Colibri au centre - PLUS GRAND */}
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
            className="absolute inset-0 -m-12 animate-pulse-slow"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
            }}
          />

          {/* Logo - taille augmentée */}
          <div className="relative w-48 h-64 lg:w-56 lg:h-72">
            <Image
              src="/images/logo-colibri.png"
              alt="Formation Colibri"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Badge Qualiopi - plus visible */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-dark-800/95 border border-emerald-500/50 backdrop-blur-sm transition-all duration-500 shadow-lg"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
          transitionDelay: '0.6s',
        }}
      >
        <span className="text-base font-semibold text-emerald-400">✓ Certifié Qualiopi</span>
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
        return <ServerRoomVisual />;
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
