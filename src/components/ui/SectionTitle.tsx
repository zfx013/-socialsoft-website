'use client';

import { useScrollReveal } from '@/hooks/useScrollAnimation';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-light-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
