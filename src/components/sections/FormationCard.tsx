'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, CheckCircle, ArrowRight, Euro, ChevronDown } from 'lucide-react';

interface Programme {
  windows: string[];
  word: string[];
  excel: string[];
  internet: string[];
  outlook: string[];
}

interface FormationProps {
  formation: {
    id: string;
    title: string;
    duration: string;
    level: string;
    modalite: string;
    tarif: string;
    capacite: string;
    description: string;
    objectives: string[];
    programme: Programme;
    eligible: string[];
    link: string;
  };
}

export default function FormationCard({ formation }: FormationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-3xl bg-dark-800/50 border border-dark-600 overflow-hidden">
      {/* Carte principale */}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-light-100 mb-4">
          {formation.title}
        </h3>

        <p className="text-light-300 mb-8 leading-relaxed text-lg">
          {formation.description}
        </p>

        {/* Infos pratiques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-light-100">Durée</span>
            </div>
            <p className="text-light-300">{formation.duration}</p>
            <p className="text-sm text-light-400">{formation.modalite}</p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-light-100">Tarif</span>
            </div>
            <p className="text-light-300">{formation.tarif}</p>
          </div>
          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-light-100">Capacité</span>
            </div>
            <p className="text-light-300">{formation.capacite}</p>
          </div>
        </div>

        {/* Objectifs */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-light-100 mb-4">Objectifs pédagogiques</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {formation.objectives.map((objective, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-light-200">{objective}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton programme détaillé */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-dark-700/30 border border-dark-600 hover:border-emerald-500/30 transition-colors mb-6"
        >
          <span className="text-light-100 font-medium">Programme détaillé</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-emerald-400" />
          </motion.div>
        </button>

        {/* Programme détaillé dépliable */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {/* Windows */}
                <div className="p-5 rounded-2xl bg-dark-700/30 border border-dark-600">
                  <h5 className="text-lg font-semibold text-emerald-400 mb-4">Windows</h5>
                  <ul className="space-y-2">
                    {formation.programme.windows.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-light-300">
                        <span className="text-emerald-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Word */}
                <div className="p-5 rounded-2xl bg-dark-700/30 border border-dark-600">
                  <h5 className="text-lg font-semibold text-blue-400 mb-4">Word</h5>
                  <ul className="space-y-2">
                    {formation.programme.word.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-light-300">
                        <span className="text-blue-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Excel */}
                <div className="p-5 rounded-2xl bg-dark-700/30 border border-dark-600">
                  <h5 className="text-lg font-semibold text-green-400 mb-4">Excel</h5>
                  <ul className="space-y-2">
                    {formation.programme.excel.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-light-300">
                        <span className="text-green-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Internet */}
                <div className="p-5 rounded-2xl bg-dark-700/30 border border-dark-600">
                  <h5 className="text-lg font-semibold text-cyan-400 mb-4">Internet</h5>
                  <ul className="space-y-2">
                    {formation.programme.internet.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-light-300">
                        <span className="text-cyan-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Outlook */}
                <div className="p-5 rounded-2xl bg-dark-700/30 border border-dark-600 md:col-span-2 lg:col-span-2">
                  <h5 className="text-lg font-semibold text-orange-400 mb-4">Outlook</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {formation.programme.outlook.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-light-300">
                        <span className="text-orange-400 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Éligibilité et CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-dark-600">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-light-400 mr-2">Éligible :</span>
            {formation.eligible.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400"
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href={formation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity"
          >
            S&apos;inscrire
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
