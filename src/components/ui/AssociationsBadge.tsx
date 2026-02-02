'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

export default function AssociationsBadge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('associations-badge-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('associations-badge-dismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed left-4 bottom-24 z-40"
        >
          <div className="relative group">
            {/* Badge principal */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/90 text-white shadow-lg shadow-emerald-500/30 backdrop-blur-sm">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">Amis des associations</span>
            </div>

            {/* Bouton fermer */}
            <button
              onClick={handleDismiss}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-dark-800 border border-dark-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-dark-700"
              aria-label="Fermer"
            >
              <X className="w-3 h-3 text-light-300" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
