'use client';

import { useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Code, GraduationCap, ArrowRight, Monitor, Laptop, Smartphone, Printer, Wifi, Cloud, HardDrive, Shield, Router, Database, Radio, Lock, Network, Cpu } from 'lucide-react';
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

// Import dynamique pour les composants 3D
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
// IT VISUAL - Topologie Réseau Organique
// ============================================
function NetworkTopology() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Équipements réseau (infrastructure) - positions irrégulières, agrandi et étendu à droite
  const infraDevices = [
    { id: 'router', icon: Router, label: 'Routeur', x: 0, y: 0, size: 'lg', color: 'from-blue-600 to-blue-700', delay: 0 },
    { id: 'firewall', icon: Shield, label: 'Firewall', x: -115, y: -75, size: 'md', color: 'from-red-500 to-orange-500', delay: 0.1 },
    { id: 'switch', icon: Network, label: 'Switch', x: 115, y: 45, size: 'md', color: 'from-cyan-500 to-cyan-600', delay: 0.15 },
    { id: 'server', icon: HardDrive, label: 'Serveur', x: -95, y: 80, size: 'md', color: 'from-slate-600 to-slate-700', delay: 0.2 },
    { id: 'nas', icon: Database, label: 'NAS', x: 25, y: 115, size: 'sm', color: 'from-purple-500 to-purple-600', delay: 0.25 },
    { id: 'cloud', icon: Cloud, label: 'Cloud', x: -180, y: -135, size: 'md', color: 'from-sky-400 to-sky-500', delay: 0.3 },
  ];

  // Équipements utilisateurs - dispersés, plus étendus à droite
  const userDevices = [
    { id: 'pc1', icon: Monitor, label: 'Poste 1', x: 215, y: -35, size: 'sm', color: 'from-blue-500 to-blue-600', delay: 0.35, connectTo: 'switch' },
    { id: 'pc2', icon: Monitor, label: 'Poste 2', x: 235, y: 60, size: 'sm', color: 'from-blue-500 to-blue-600', delay: 0.4, connectTo: 'switch' },
    { id: 'pc3', icon: Monitor, label: 'Poste 3', x: 195, y: 135, size: 'sm', color: 'from-blue-500 to-blue-600', delay: 0.42, connectTo: 'switch' },
    { id: 'laptop1', icon: Laptop, label: 'Portable', x: 155, y: -95, size: 'sm', color: 'from-indigo-500 to-indigo-600', delay: 0.45, connectTo: 'switch' },
    { id: 'printer', icon: Printer, label: 'Imprimante', x: 60, y: -100, size: 'sm', color: 'from-amber-500 to-amber-600', delay: 0.5, connectTo: 'router' },
    { id: 'wifi1', icon: Radio, label: 'Borne WiFi', x: -190, y: 30, size: 'sm', color: 'from-emerald-500 to-emerald-600', delay: 0.55, connectTo: 'router' },
    { id: 'phone', icon: Smartphone, label: 'Mobile', x: -235, y: 100, size: 'xs', color: 'from-violet-500 to-violet-600', delay: 0.6, connectTo: 'wifi1' },
    { id: 'laptop2', icon: Laptop, label: 'Laptop WiFi', x: -245, y: -40, size: 'xs', color: 'from-indigo-400 to-indigo-500', delay: 0.65, connectTo: 'wifi1' },
  ];

  // Connexions entre équipements
  const connections = [
    { from: 'router', to: 'firewall' },
    { from: 'router', to: 'switch' },
    { from: 'router', to: 'server' },
    { from: 'router', to: 'wifi1' },
    { from: 'router', to: 'printer' },
    { from: 'firewall', to: 'cloud' },
    { from: 'server', to: 'nas' },
    { from: 'switch', to: 'pc1' },
    { from: 'switch', to: 'pc2' },
    { from: 'switch', to: 'pc3' },
    { from: 'switch', to: 'laptop1' },
    { from: 'wifi1', to: 'phone' },
    { from: 'wifi1', to: 'laptop2' },
  ];

  const allDevices = [...infraDevices, ...userDevices];
  const getDevice = (id: string) => allDevices.find(d => d.id === id);

  const sizeClasses = {
    lg: 'w-24 h-24',
    md: 'w-16 h-16',
    sm: 'w-14 h-14',
    xs: 'w-11 h-11',
  };
  const iconSizes = {
    lg: 'w-12 h-12',
    md: 'w-8 h-8',
    sm: 'w-7 h-7',
    xs: 'w-5 h-5',
  };

  const centerX = 260;
  const centerY = 260;

  return (
    <div ref={ref} className="relative w-full max-w-2xl ml-auto mr-0 h-[500px]">
      {/* Lignes de connexion SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="line-grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="line-grad-green" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {connections.map((conn, i) => {
          const fromDev = getDevice(conn.from);
          const toDev = getDevice(conn.to);
          if (!fromDev || !toDev) return null;
          const x1 = centerX + fromDev.x;
          const y1 = centerY + fromDev.y;
          const x2 = centerX + toDev.x;
          const y2 = centerY + toDev.y;
          const isInfra = infraDevices.some(d => d.id === conn.to);
          return (
            <g key={i}>
              <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isInfra ? "url(#line-grad-blue)" : "url(#line-grad-green)"}
                strokeWidth={isInfra ? "2" : "1.5"}
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: isInView ? 0 : 200,
                  transition: 'stroke-dashoffset 1s ease-out',
                  transitionDelay: `${Math.max(fromDev.delay, toDev.delay)}s`,
                }}
              />
              {/* Particule animée sur certaines connexions */}
              {isInView && i % 3 === 0 && (
                <circle r="3" fill="#06b6d4" opacity="0.8">
                  <animate attributeName="cx" values={`${x1};${x2};${x1}`} dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${0.5 + i * 0.1}s`} />
                  <animate attributeName="cy" values={`${y1};${y2};${y1}`} dur={`${2.5 + i * 0.2}s`} repeatCount="indefinite" begin={`${0.5 + i * 0.1}s`} />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tous les devices */}
      {allDevices.map((device) => {
        const Icon = device.icon;
        const isRouter = device.id === 'router';
        return (
          <div
            key={device.id}
            className="absolute transition-all duration-700"
            style={{
              left: centerX + device.x,
              top: centerY + device.y,
              transform: 'translate(-50%, -50%)',
              opacity: isInView ? 1 : 0,
              transitionDelay: `${device.delay}s`,
            }}
          >
            <div className="flex flex-col items-center">
              {/* Glow pour le routeur */}
              {isRouter && (
                <div className="absolute -inset-3 bg-blue-500/20 rounded-full blur-lg animate-pulse" />
              )}
              <div className={`relative ${sizeClasses[device.size as keyof typeof sizeClasses]} rounded-xl bg-gradient-to-br ${device.color} flex items-center justify-center shadow-lg`}>
                <Icon className={`${iconSizes[device.size as keyof typeof iconSizes]} text-white`} />
                {/* Status LED */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 status-dot border border-dark-900" />
              </div>
              <p className="text-[10px] text-light-400 mt-1 font-medium whitespace-nowrap">{device.label}</p>
            </div>
          </div>
        );
      })}

      {/* Styles */}
      <style jsx>{`
        .status-dot {
          animation: pulse-status 2s ease-in-out infinite;
        }
        @keyframes pulse-status {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4); }
          50% { box-shadow: 0 0 6px 2px rgba(52, 211, 153, 0.3); }
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
        return <NetworkTopology />;
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
      <div className="relative pt-4 pb-6 lg:pt-6 lg:pb-8 bg-dark-900">
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
