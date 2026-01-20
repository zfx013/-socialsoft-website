'use client';

import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlowEffect from '@/components/effects/GlowEffect';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <GlowEffect className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" size="lg" />
      <GlowEffect className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" color="cyan" size="md" />

      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
          className="relative mb-8"
        >
          {/* Glitch effect container */}
          <div className="relative">
            <motion.h1
              className="text-[150px] sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-cyan leading-none"
              animate={{
                textShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.h1>

            {/* Glitch layers */}
            <motion.div
              className="absolute inset-0 text-[150px] sm:text-[200px] font-bold text-accent-blue/20 leading-none"
              animate={{
                x: [-2, 2, -2],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{ clipPath: 'inset(0 0 60% 0)' }}
            >
              404
            </motion.div>

            <motion.div
              className="absolute inset-0 text-[150px] sm:text-[200px] font-bold text-accent-cyan/20 leading-none"
              animate={{
                x: [2, -2, 2],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
              style={{ clipPath: 'inset(60% 0 0 0)' }}
            >
              404
            </motion.div>
          </div>
        </motion.div>

        {/* Error icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="w-16 h-16 rounded-full bg-dark-800 border border-dark-600 flex items-center justify-center">
            <Search className="w-8 h-8 text-light-400" />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-light-100 mb-4">
            Page introuvable
          </h2>
          <p className="text-light-300 mb-8 max-w-md mx-auto">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
            Pas de panique, retournons sur une page qui fonctionne.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button href="/" size="lg">
            <Home className="w-5 h-5 mr-2" />
            Retour à l&apos;accueil
          </Button>
          <Button
            href="javascript:history.back()"
            variant="secondary"
            size="lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Page précédente
          </Button>
        </motion.div>

        {/* Contact suggestion */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-light-400 text-sm"
        >
          Besoin d&apos;aide ?{' '}
          <a href="/#contact" className="text-accent-blue hover:text-accent-cyan transition-colors">
            Contactez-nous
          </a>
        </motion.p>

        {/* Floating particles decoration */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent-blue/30"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
