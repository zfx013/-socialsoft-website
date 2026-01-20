'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Chemins SVG précis des départements d'Île-de-France
// Tracés à la main sur Figma pour une précision maximale
const departments = [
  {
    id: '77',
    name: 'Seine-et-Marne',
    path: 'M481 578.718L360.5 583.718L377 544.718L342.5 514.718V486.718L382 439.218L377 372.218L410.5 237.718L398 180.718L402 135.218L389.5 109.218L392 78.7181L430.5 68.2181L560.5 80.7181L576 64.2181H587.5L603.5 113.218L721.5 200.718L686 246.218L712 267.718V299.218L736 328.218L686 431.218L553 461.218V520.218L481 578.718Z',
    center: { x: 550, y: 320 },
  },
  {
    id: '91',
    name: 'Essonne',
    path: 'M191 353.718L171 356.218L177.5 372.218L166 410.718V431.718L177.5 444.718L181.5 490.218L201.5 500.718L262.5 470.718L285.5 482.718L330 480.218L367.5 434.218L365 364.718L382 292.718L359.5 263.218L332.5 272.218H306.5L261.5 247.218L204.5 299.718L213 320.218L191 353.718Z',
    center: { x: 265, y: 390 },
  },
  {
    id: '75',
    name: 'Paris',
    path: 'M281 190.718L299.5 174.218L314 175.718L321 180.718L327.5 204.218L343 205.718V213.718L324 212.218L299.5 205.718L281 190.718Z',
    center: { x: 312, y: 194 },
    main: true,
  },
  {
    id: '92',
    name: 'Hauts-de-Seine',
    path: 'M244 207.718L238.5 186.718L268.5 155.218L292 145.218V166.718L264 193.218L294 215.718L289.5 247.218L261.5 228.218L244 207.718Z',
    center: { x: 266, y: 196 },
  },
  {
    id: '93',
    name: 'Seine-Saint-Denis',
    path: 'M304.5 166.718V142.718H339.5L378.5 118.218L389.5 142.718L385.5 178.218L389.5 199.718V209.718L359.5 193.218H337L327.5 166.718H304.5Z',
    center: { x: 350, y: 165 },
  },
  {
    id: '94',
    name: 'Val-de-Marne',
    path: 'M301 253.718L306.5 222.218L348.5 224.218L359.5 204.218L395.5 224.218L398 230.218V241.218L385.5 277.718L365.5 249.718H359.5L321 259.218L301 253.718Z',
    center: { x: 348, y: 242 },
  },
  {
    id: '78',
    name: 'Yvelines',
    path: 'M45.5 77.7181L0.5 89.7181V94.7181L41 235.218L59 259.218L49 281.218L111 356.218V380.718L155 407.718L162.5 370.218L153 353.718V346.218L182 341.218L196.5 320.218L191 296.718L247 239.718L221.5 183.718L256.5 149.218L221.5 113.218H174.5L122.5 89.7181L85 94.7181L45.5 77.7181Z',
    center: { x: 120, y: 235 },
  },
  {
    id: '95',
    name: "Val-d'Oise",
    path: 'M87.5 81.7181L55 67.2181L78.5 5.71814L89.5 0.71814L94 24.2181L182.5 29.2181L208.5 5.71814L242 24.2181L359.5 55.2181L378.5 71.7181L376.5 103.718L337 131.718H288.5L265.5 139.718L229.5 100.718L174.5 98.7181L124 78.2181L87.5 81.7181Z',
    center: { x: 220, y: 70 },
    highlight: true,
  },
];

// Position du siège (Saint-Ouen-l'Aumône dans le 95)
const headquarters = { x: 140, y: 55, name: "Saint-Ouen-l'Aumône" };

export default function IdfMap() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);
  const [activeConnection, setActiveConnection] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation des connexions
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % departments.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div ref={mapRef} className="relative w-full h-full min-h-[400px]">
      {/* Fond avec grille subtile */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* SVG principal de la carte */}
      <svg
        className="absolute inset-0 w-full h-full p-4"
        viewBox="0 0 737 585"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients pour les départements */}
          <linearGradient id="deptDefault" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A5F" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="deptHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#155E75" />
            <stop offset="100%" stopColor="#0E7490" />
          </linearGradient>
          <linearGradient id="deptMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="deptHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Filtre glow */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Lignes de connexion depuis le siège */}
        {isVisible && departments.map((dept, i) => (
          <motion.line
            key={`line-${dept.id}`}
            x1={headquarters.x}
            y1={headquarters.y}
            x2={dept.center.x}
            y2={dept.center.y}
            stroke={activeConnection === i ? '#06B6D4' : '#3B82F6'}
            strokeWidth={activeConnection === i ? 3 : 1}
            strokeOpacity={activeConnection === i ? 0.9 : 0.15}
            strokeDasharray={activeConnection === i ? '0' : '6 6'}
            filter={activeConnection === i ? 'url(#glow)' : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}

        {/* Départements */}
        {departments.map((dept, i) => {
          const isHovered = hoveredDept === dept.id;
          const isActive = activeConnection === i;

          return (
            <motion.g key={dept.id}>
              <motion.path
                d={dept.path}
                fill={
                  isHovered
                    ? 'url(#deptHover)'
                    : dept.main
                    ? 'url(#deptMain)'
                    : dept.highlight
                    ? 'url(#deptHighlight)'
                    : 'url(#deptDefault)'
                }
                stroke={isHovered || dept.highlight || dept.main ? '#06B6D4' : '#3B82F6'}
                strokeWidth={isHovered ? 4 : dept.highlight || dept.main ? 3 : 2}
                strokeOpacity={isHovered ? 1 : 0.6}
                filter={isHovered ? 'url(#glow)' : undefined}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredDept(dept.id)}
                onMouseLeave={() => setHoveredDept(null)}
                style={{ cursor: 'pointer' }}
              />

              {/* Numéro du département */}
              <motion.text
                x={dept.center.x}
                y={dept.center.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHovered || dept.main || dept.highlight ? '#fff' : '#94A3B8'}
                fontSize={dept.main ? '18' : dept.id === '77' ? '32' : '24'}
                fontWeight={dept.main || dept.highlight || isHovered ? '600' : '400'}
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                style={{ pointerEvents: 'none' }}
              >
                {dept.id}
              </motion.text>
            </motion.g>
          );
        })}

        {/* Point animé sur la connexion active */}
        {isVisible && (
          <motion.circle
            r="6"
            fill="#06B6D4"
            filter="url(#glowStrong)"
            animate={{
              cx: [headquarters.x, departments[activeConnection].center.x],
              cy: [headquarters.y, departments[activeConnection].center.y],
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        )}

        {/* Siège */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Cercle pulsant */}
          <motion.circle
            cx={headquarters.x}
            cy={headquarters.y}
            r="25"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2"
            animate={{ r: [25, 40, 25], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Point */}
          <circle
            cx={headquarters.x}
            cy={headquarters.y}
            r="12"
            fill="#06B6D4"
            filter="url(#glowStrong)"
          />
          <circle
            cx={headquarters.x}
            cy={headquarters.y}
            r="5"
            fill="#fff"
          />
        </motion.g>
      </svg>

      {/* Label SIÈGE */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: `${(headquarters.x / 737) * 100}%`,
          top: `${((headquarters.y - 10) / 585) * 100}%`,
          transform: 'translateX(-50%)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
      >
        <span className="text-[10px] font-bold text-accent-cyan bg-dark-900/90 px-2 py-0.5 rounded border border-accent-cyan/40">
          SIÈGE
        </span>
      </motion.div>

      {/* Tooltip au survol */}
      <AnimatePresence>
        {hoveredDept && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-16 right-4 px-3 py-2 rounded-lg bg-dark-900/95 border border-accent-cyan/40 backdrop-blur-sm"
          >
            <p className="text-sm font-semibold text-white">
              {departments.find(d => d.id === hoveredDept)?.name}
            </p>
            <p className="text-xs text-accent-cyan">
              Département {hoveredDept}
            </p>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Indicateur "Île-de-France" */}
      <motion.div
        className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-dark-800/90 border border-accent-blue/30"
        initial={{ opacity: 0, x: 10 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.8 }}
      >
        <span className="text-sm font-semibold text-white">Île-de-France</span>
      </motion.div>

      {/* Effet de scan */}
      {isVisible && (
        <motion.div
          className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-accent-cyan/30 to-transparent"
          initial={{ left: '0%' }}
          animate={{ left: '100%' }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}
