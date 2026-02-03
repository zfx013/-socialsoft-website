'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import MagneticButton from '@/components/effects/MagneticButton';

interface HeroCTAProps {
  primaryText: string;
  primaryHref: string;
  phoneNumber: string;
  phoneLink: string;
  gradientFrom?: string;
  gradientTo?: string;
  hoverBorderColor?: string;
  phoneIconColor?: string;
}

export default function HeroCTA({
  primaryText,
  primaryHref,
  phoneNumber,
  phoneLink,
  gradientFrom = 'from-blue-500',
  gradientTo = 'to-cyan-500',
  hoverBorderColor = 'hover:border-blue-500/50',
  phoneIconColor = 'text-blue-400',
}: HeroCTAProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <MagneticButton strength={0.2} radius={100}>
        <Link
          href={primaryHref}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white font-medium hover:opacity-90 transition-opacity`}
        >
          {primaryText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </MagneticButton>
      <MagneticButton strength={0.2} radius={100}>
        <a
          href={phoneLink}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-700 border border-dark-600 text-light-100 font-medium ${hoverBorderColor} transition-colors`}
        >
          <Phone className={`w-4 h-4 ${phoneIconColor}`} />
          {phoneNumber}
        </a>
      </MagneticButton>
    </div>
  );
}
