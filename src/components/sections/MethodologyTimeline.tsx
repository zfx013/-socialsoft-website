'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { methodology } from '@/lib/config';

export default function MethodologyTimeline() {
  return (
    <section className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
            Notre méthodologie
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Une approche structurée pour des projets réussis
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Ligne centrale (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-blue-500/50" />

          <div className="space-y-12 lg:space-y-0">
            {methodology.map((item, index) => (
              <TimelineItem
                key={item.step}
                step={item.step}
                title={item.title}
                description={item.description}
                isLeft={index % 2 === 0}
                isLast={index === methodology.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  step: number;
  title: string;
  description: string;
  isLeft: boolean;
  isLast: boolean;
}

function TimelineItem({ step, title, description, isLeft, isLast }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center lg:py-8">
      {/* Point sur la timeline (desktop) */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30"
        >
          {step}
        </motion.div>
      </div>

      {/* Flèche vers le prochain (desktop) */}
      {!isLast && (
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ArrowRight className="w-6 h-6 text-dark-500 rotate-90" />
          </motion.div>
        </div>
      )}

      {/* Contenu gauche */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`${isLeft ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}
      >
        <div className="relative p-6 rounded-2xl bg-dark-800/50 border border-dark-600 hover:border-blue-500/30 transition-all duration-300">
          {/* Numéro mobile */}
          <div className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold mb-4">
            {step}
          </div>

          <h3 className="text-xl font-semibold text-light-100 mb-3">
            {title}
          </h3>
          <p className="text-light-300 leading-relaxed">
            {description}
          </p>

          {/* Connecteur vers la ligne centrale (desktop) */}
          <div
            className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r ${
              isLeft
                ? 'right-0 translate-x-full from-dark-600 to-blue-500/50'
                : 'left-0 -translate-x-full from-blue-500/50 to-dark-600'
            }`}
          />
        </div>
      </motion.div>

      {/* Espace vide pour l'autre côté (desktop) */}
      {isLeft && <div className="hidden lg:block" />}
    </div>
  );
}
