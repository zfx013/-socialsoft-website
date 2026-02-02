'use client';

import { motion } from 'framer-motion';
import { Quote, Star, Building2 } from 'lucide-react';
import GlowEffect from '@/components/effects/GlowEffect';
import SplitText from '@/components/effects/SplitText';
import SectionTransition from '@/components/effects/SectionTransition';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

const testimonials = [
  {
    quote: "SOCIAL SOFT a transformé notre infrastructure IT. Réactivité et professionnalisme au rendez-vous.",
    author: "Marie D.",
    role: "Directrice",
    company: "Cabinet comptable",
    rating: 5,
  },
  {
    quote: "Un partenaire de confiance pour notre migration cloud. L'équipe a su s'adapter à nos contraintes.",
    author: "Thomas L.",
    role: "DSI",
    company: "PME industrielle",
    rating: 5,
  },
  {
    quote: "Support réactif et solutions toujours adaptées à notre budget. Je recommande vivement.",
    author: "Sophie M.",
    role: "Gérante",
    company: "Agence immobilière",
    rating: 5,
  },
];

const clientTypes = [
  { icon: Building2, label: 'TPE', count: '30+' },
  { icon: Building2, label: 'PME', count: '20+' },
  { icon: Building2, label: 'Associations', count: '10+' },
];

export default function Clients() {
  return (
    <section id="clients" className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
      <GlowEffect className="top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2" size="lg" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="inline-block px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium mb-6"
          >
            Témoignages
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            <SplitText animation="slide" type="words">
              Ils nous font confiance
            </SplitText>
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Des entreprises de toutes tailles nous confient leur IT
          </p>
        </div>

        {/* Client types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {clientTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.label}
                whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-dark-800/50 border border-dark-700 transition-colors"
              >
                <Icon className="w-5 h-5 text-accent-blue" />
                <AnimatedCounter
                  value={type.count}
                  className="text-2xl font-bold"
                  glowColor="cyan"
                />
                <span className="text-light-400">{type.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <SectionTransition key={index} animation="slide-up" delay={index * 0.1}>
            <div
              className="group relative p-6 lg:p-8 rounded-2xl bg-dark-800/30 border border-dark-700 hover:border-accent-blue/30 transition-all duration-300 h-full"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-accent-blue" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-cyan fill-accent-cyan" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-light-200 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-cyan flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-light-100 font-medium">{testimonial.author}</div>
                  <div className="text-light-400 text-sm">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
            </SectionTransition>
          ))}
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center text-light-400 mt-12"
        >
          Et de nombreuses autres entreprises en Île-de-France nous font confiance au quotidien.
        </motion.p>
      </div>
    </section>
  );
}
