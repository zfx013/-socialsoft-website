'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="relative py-20 lg:py-28 bg-dark-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-sm text-accent-blue mb-6"
        >
          <Users className="w-4 h-4" />
          Notre histoire
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-light-100 mb-4"
        >
          Pourquoi choisir SOCIAL SOFT ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-light-200 mb-8 max-w-2xl mx-auto"
        >
          25 ans d&apos;expertise, un interlocuteur unique et une approche sur mesure
          pour accompagner TPE, PME et Associations dans tous leurs projets IT.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/pourquoi-nous"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-700 border border-dark-600 text-light-100 font-medium hover:border-accent-blue/50 hover:bg-dark-600 transition-all group"
          >
            En savoir plus sur nous
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
