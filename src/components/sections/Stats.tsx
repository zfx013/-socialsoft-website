'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Users, Briefcase, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Briefcase,
    value: 150,
    suffix: '+',
    label: 'Projets réalisés',
    description: 'depuis notre création',
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Clients satisfaits',
    description: 'TPE et PME accompagnées',
  },
  {
    icon: Award,
    value: 10,
    suffix: ' ans',
    label: "D'expertise",
    description: 'dans le secteur IT',
  },
  {
    icon: Clock,
    value: 4,
    suffix: 'h',
    label: 'Intervention urgence',
    description: 'délai garanti sous contrat',
  },
];

interface CounterProps {
  value: number;
  suffix: string;
  inView: boolean;
}

function Counter({ value, suffix, inView }: CounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !counterRef.current) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.round(obj.value));
      },
    });
  }, [inView, value]);

  return (
    <span ref={counterRef} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-dark-900 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative p-8 lg:p-10 rounded-2xl bg-dark-800/50 border border-dark-700 hover:border-accent-blue/30 transition-all duration-300 text-center">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-cyan/10 text-accent-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Value */}
                  <div className="text-4xl lg:text-5xl font-bold text-light-100 mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
                  </div>

                  {/* Label */}
                  <div className="text-light-100 font-semibold mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-light-400 text-sm">
                    {stat.description}
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-accent-blue/40 rounded-tr-lg" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
