'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Code, GraduationCap, ArrowRight, Wifi, Shield, Database, Cloud } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { poles } from '@/lib/config';

const iconMap = {
  Server,
  Code,
  GraduationCap,
} as const;

type IconKey = keyof typeof iconMap;

// Lignes de code pour le terminal (défini en dehors du composant pour éviter les re-créations)
const CODE_LINES = [
  '$ npm create next-app@latest',
  '✓ Creating new project...',
  '',
  'import { useState } from "react"',
  '',
  'export default function App() {',
  '  const [data, setData] = useState([])',
  '',
  '  return (',
  '    <main className="container">',
  '      <h1>Bienvenue</h1>',
  '      {data.map(item => (',
  '        <Card key={item.id} />',
  '      ))}',
  '    </main>',
  '  )',
  '}',
];

// Composant Terminal animé pour le pôle Développement
function AnimatedTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(terminalRef, { once: true, margin: '-50px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isInView || !mounted) return;

    let lineIndex = 0;
    let isCancelled = false;

    const interval = setInterval(() => {
      if (isCancelled) return;

      if (lineIndex < CODE_LINES.length) {
        setDisplayedLines(prev => [...prev, CODE_LINES[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [isInView, mounted]);

  return (
    <div ref={terminalRef} className="relative w-full max-w-lg mx-auto">
      {/* Terminal window */}
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
        {/* Terminal content */}
        <div className="bg-dark-900 p-4 h-80 overflow-hidden font-mono text-sm">
          {displayedLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${line.startsWith('$') ? 'text-green-400' : line.startsWith('✓') ? 'text-emerald-400' : line.includes('import') || line.includes('export') || line.includes('const') || line.includes('return') ? 'text-violet-400' : line.includes('className') ? 'text-cyan-400' : line.includes('"') || line.includes("'") ? 'text-amber-400' : 'text-light-300'}`}
            >
              {line || '\u00A0'}
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-2 h-4 bg-violet-400 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

// Composant visualisation Infrastructure IT
function InfrastructureVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  const nodes = [
    { id: 'server', icon: Server, x: 50, y: 20, label: 'Serveur' },
    { id: 'cloud', icon: Cloud, x: 20, y: 50, label: 'Cloud' },
    { id: 'shield', icon: Shield, x: 80, y: 50, label: 'Sécurité' },
    { id: 'db', icon: Database, x: 35, y: 80, label: 'BDD' },
    { id: 'wifi', icon: Wifi, x: 65, y: 80, label: 'Réseau' },
  ];

  const connections = [
    { from: 'server', to: 'cloud' },
    { from: 'server', to: 'shield' },
    { from: 'server', to: 'db' },
    { from: 'server', to: 'wifi' },
    { from: 'cloud', to: 'db' },
    { from: 'shield', to: 'wifi' },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto aspect-square">
      {/* Lignes de connexion animées */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!;
          const toNode = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#blueGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView && mounted ? { pathLength: 1, opacity: 0.4 } : {}}
              transition={{ duration: 1, delay: i * 0.15 }}
            />
          );
        })}
        {/* Particules animées sur les connexions */}
        {connections.map((conn, i) => {
          const fromNode = nodes.find(n => n.id === conn.from)!;
          const toNode = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.circle
              key={`particle-${i}`}
              r="1"
              fill="#3B82F6"
              initial={{ opacity: 0 }}
              animate={isInView && mounted ? {
                opacity: [0, 1, 0],
                cx: [fromNode.x, toNode.x],
                cy: [fromNode.y, toNode.y],
              } : {}}
              transition={{
                duration: 2,
                delay: 1 + i * 0.3,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nœuds */}
      {nodes.map((node, i) => {
        const Icon = node.icon;
        return (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView && mounted ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1, type: 'spring' }}
          >
            <motion.div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${node.id === 'server' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16' : 'bg-dark-700 border border-blue-500/30'}`}
              animate={node.id === 'server' ? { y: [0, -5, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon className={`${node.id === 'server' ? 'w-8 h-8 text-white' : 'w-6 h-6 text-blue-400'}`} />
            </motion.div>
            <span className="text-xs text-light-400 mt-2 font-medium">{node.label}</span>
          </motion.div>
        );
      })}

      {/* Glow central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
    </div>
  );
}

// Composant Logo Colibri pour Formation
function ColibriVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-sm mx-auto">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView && mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Glow effect derrière le logo */}
        <motion.div
          className="absolute inset-0 -m-8"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Logo Colibri */}
        <div className="relative w-48 h-64 mx-auto">
          <Image
            src="/images/logo-colibri.png"
            alt="Formation Colibri"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        {/* Particules autour */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: x,
                marginTop: y,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          );
        })}
      </motion.div>

      {/* Badge Qualiopi */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-dark-700 border border-emerald-500/30 text-sm text-emerald-400 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView && mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Certifié Qualiopi
      </motion.div>
    </div>
  );
}

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
        return <InfrastructureVisual />;
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
