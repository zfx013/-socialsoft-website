'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { whyUs } from '@/lib/constants';
import GlowEffect from '@/components/effects/GlowEffect';
import SplitText from '@/components/effects/SplitText';
import { ParallaxBackground } from '@/components/effects/ParallaxLayer';
import SectionTransition from '@/components/effects/SectionTransition';

export default function WhyUs() {
  return (
    <section id="pourquoi-nous" className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
      {/* Parallax background */}
      <ParallaxBackground />

      {/* Background */}
      <GlowEffect className="bottom-0 left-0 translate-y-1/2 -translate-x-1/2" color="cyan" size="lg" />
      <GlowEffect className="top-1/3 right-0 translate-x-1/2" size="md" />

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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-cyan/10 text-accent-cyan mb-6 relative"
          >
            <Sparkles className="w-8 h-8" />
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-accent-cyan/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            <SplitText animation="slide" type="words">
              Pourquoi SOCIAL SOFT ?
            </SplitText>
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Ce qui nous différencie des autres prestataires IT
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {whyUs.map((item, index) => (
            <SectionTransition key={item.title} animation="slide-up" delay={index * 0.1}>
              <WhyUsCard item={item} index={index} />
            </SectionTransition>
          ))}
        </div>
      </div>
    </section>
  );
}

interface WhyUsCardProps {
  item: { title: string; description: string };
  index: number;
}

function WhyUsCard({ item, index }: WhyUsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex gap-5 p-6 lg:p-8 rounded-2xl bg-dark-700/30 border border-dark-600 hover:border-accent-cyan/30 transition-all duration-300 overflow-hidden h-full"
    >
      {/* Animated border glow */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-[-1px] rounded-2xl"
              style={{
                background: 'conic-gradient(from 0deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.4))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[1px] rounded-2xl bg-dark-700/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Scan line effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent"
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Check icon */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-blue/10 flex items-center justify-center group-hover:from-accent-cyan/30 group-hover:to-accent-blue/20 transition-all duration-300"
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <Check className="w-6 h-6 text-accent-cyan" />
        </motion.div>
        {/* Number badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-800 border border-dark-600 flex items-center justify-center text-xs text-light-400 font-medium"
          animate={isHovered ? { borderColor: 'rgba(6, 182, 212, 0.5)' } : { borderColor: 'rgba(75, 85, 99, 1)' }}
        >
          {index + 1}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-light-100 mb-2 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-light-200 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}
