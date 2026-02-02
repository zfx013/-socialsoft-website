'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Code, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import GlowEffect from '@/components/effects/GlowEffect';
import SplitText from '@/components/effects/SplitText';
import { poles } from '@/lib/config';

const iconMap = {
  Server,
  Code,
  GraduationCap,
} as const;

type IconKey = keyof typeof iconMap;

interface PoleCardProps {
  pole: typeof poles[0];
  index: number;
}

function PoleCard({ pole, index }: PoleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const Icon = iconMap[pole.icon as IconKey] || Server;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <Link href={pole.href}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative h-full p-8 rounded-3xl bg-dark-800/50 border border-dark-600 hover:border-transparent transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* Animated border gradient */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-[-2px] rounded-3xl"
                  style={{
                    background: `conic-gradient(from 0deg, ${pole.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.6)' : pole.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)'}, transparent, ${pole.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.6)' : pole.gradient.includes('purple') ? 'rgba(168, 85, 247, 0.6)' : 'rgba(20, 184, 166, 0.6)'}, transparent, ${pole.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.6)' : pole.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.6)' : 'rgba(16, 185, 129, 0.6)'})`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-[1px] rounded-3xl bg-dark-800/95" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dynamic glow following cursor */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${pole.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.15)' : pole.gradient.includes('violet') ? 'rgba(139, 92, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)'} 0%, transparent 50%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon with gradient background */}
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${pole.gradient} mb-6`}
              animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl font-bold text-light-100 mb-1 group-hover:text-white transition-colors">
              {pole.title}
            </h3>
            <p className={`text-sm font-medium mb-4 bg-gradient-to-r ${pole.gradient} bg-clip-text text-transparent`}>
              {pole.subtitle}
            </p>

            {/* Description */}
            <p className="text-light-200 mb-6 leading-relaxed">
              {pole.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {pole.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-dark-700/50 text-light-300 border border-dark-600"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all duration-300">
              <span className={`bg-gradient-to-r ${pole.gradient} bg-clip-text text-transparent`}>
                En savoir plus
              </span>
              <motion.div
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className={`w-4 h-4 ${pole.gradient.includes('blue') ? 'text-blue-400' : pole.gradient.includes('violet') ? 'text-violet-400' : 'text-emerald-400'}`} />
              </motion.div>
            </div>
          </div>

          {/* Decorative corner lines */}
          <div className="absolute top-4 right-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg ${pole.gradient.includes('blue') ? 'border-blue-500/40' : pole.gradient.includes('violet') ? 'border-violet-500/40' : 'border-emerald-500/40'}`} />
          </div>
          <div className="absolute bottom-4 left-4 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg ${pole.gradient.includes('blue') ? 'border-blue-500/40' : pole.gradient.includes('violet') ? 'border-violet-500/40' : 'border-emerald-500/40'}`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Poles() {
  return (
    <section id="poles" className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
      {/* Background effects */}
      <GlowEffect className="top-0 left-1/4 -translate-y-1/2" size="lg" />
      <GlowEffect className="bottom-0 right-1/4 translate-y-1/2" color="cyan" size="md" />

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-600 text-sm text-light-300 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            3 pôles d&apos;expertise
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            <SplitText animation="slide" type="words">
              Nos domaines d&apos;intervention
            </SplitText>
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Une expertise complète pour accompagner votre entreprise dans tous ses projets IT
          </p>
        </div>

        {/* Poles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {poles.map((pole, index) => (
            <PoleCard key={pole.id} pole={pole} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
