'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';
import GlowEffect from '@/components/effects/GlowEffect';
import SplitText from '@/components/effects/SplitText';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Quels types d\'entreprises accompagnez-vous ?',
    answer: 'Nous accompagnons principalement les TPE et PME de 1 à 250 salariés. Notre expertise couvre tous les secteurs d\'activité, du commerce à l\'industrie en passant par les services.',
  },
  {
    question: 'Intervenez-vous en urgence ?',
    answer: 'Oui, nous proposons un service d\'intervention d\'urgence pour nos clients sous contrat de maintenance. Les délais d\'intervention varient selon la criticité : 4h pour les urgences critiques, 24h pour les problèmes majeurs.',
  },
  {
    question: 'Proposez-vous du support à distance ?',
    answer: 'Absolument ! Notre équipe peut intervenir à distance sur la majorité des problématiques via des outils de prise en main sécurisés. C\'est souvent la solution la plus rapide pour résoudre vos problèmes.',
  },
  {
    question: 'Comment se déroule un projet de développement ?',
    answer: 'Chaque projet suit notre méthodologie éprouvée : analyse des besoins, conception, développement itératif avec vos retours, tests approfondis, déploiement et formation. Vous êtes impliqué à chaque étape.',
  },
  {
    question: 'Quelles sont vos zones d\'intervention ?',
    answer: 'Nous intervenons sur site dans tout le Val-d\'Oise et l\'Île-de-France. Pour le support à distance, nous couvrons la France entière et même l\'international.',
  },
  {
    question: 'Proposez-vous des contrats de maintenance ?',
    answer: 'Oui, nous proposons plusieurs formules de maintenance adaptées à vos besoins : de la maintenance préventive à l\'infogérance complète, avec des SLA garantis.',
  },
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true, amount: 0.3 }}
      className="group"
    >
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
          isOpen
            ? 'bg-dark-700/80 border border-accent-blue/30'
            : 'bg-dark-800/50 border border-dark-600 hover:border-dark-500 hover:bg-dark-700/50'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-accent-blue' : 'text-light-100'}`}>
            {question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen ? 'bg-accent-blue text-white' : 'bg-dark-600 text-light-200'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div ref={contentRef} id={`faq-answer-${index}`} className="pt-4 text-light-200 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden"
    >
      <GlowEffect className="top-1/4 left-0 -translate-x-1/2" size="lg" />
      <GlowEffect className="bottom-1/4 right-0 translate-x-1/2" color="cyan" size="md" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-blue/10 text-accent-blue mb-6"
          >
            <HelpCircle className="w-8 h-8" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            <SplitText animation="slide" type="words">
              Questions fréquentes
            </SplitText>
          </h2>
          <p className="text-lg text-light-200 max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus posées par nos clients
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-light-200 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-cyan transition-colors duration-300 font-medium"
          >
            Contactez-nous directement
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
