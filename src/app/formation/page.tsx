import type { Metadata } from 'next';
import { Award, Clock, Users, BookOpen, ExternalLink } from 'lucide-react';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';
import FormationHero from '@/components/sections/FormationHero';
import FormationCard from '@/components/sections/FormationCard';
import { programmesFormation, siteContact } from '@/lib/config';

export const metadata: Metadata = {
  title: "Formation Colibri | Formations Certifiées Qualiopi",
  description: "Formations certifiées Qualiopi pour entreprises. Bureautique, Excel, compétences numériques. Éligible OPCO et CPF. Programmes adaptés tous niveaux.",
  openGraph: {
    title: "Formation Colibri | SOCIAL SOFT",
    description: "Formations certifiées Qualiopi. Bureautique, Excel, numérique. Éligible OPCO/CPF.",
  },
};

const avantages = [
  {
    icon: Award,
    title: 'Certifié Qualiopi',
    description: 'Formations éligibles aux financements OPCO, CPF et plan de formation entreprise.',
  },
  {
    icon: Users,
    title: 'Sur mesure',
    description: 'Programmes adaptés à votre contexte professionnel et aux besoins de vos équipes.',
  },
  {
    icon: Clock,
    title: 'Flexibilité',
    description: 'Sessions en présentiel ou à distance, planning adapté à vos contraintes.',
  },
  {
    icon: BookOpen,
    title: 'Tous niveaux',
    description: 'Du débutant au confirmé, chaque parcours est personnalisé selon le niveau initial.',
  },
];

export default function FormationPage() {
  return (
    <>
      {/* Hero Section avec colibris 3D */}
      <FormationHero />

      {/* Avantages */}
      <section id="avantages" className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Pourquoi choisir Colibri
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Des formations professionnelles de qualité, adaptées aux besoins des entreprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((avantage, index) => {
              const Icon = avantage.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-dark-700/50 border border-dark-600 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-light-100 mb-2">
                    {avantage.title}
                  </h3>
                  <p className="text-light-300 text-sm leading-relaxed">
                    {avantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programmes de formation */}
      <section id="formations" className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Nos formations
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Formations certifiées, conçues pour répondre aux besoins des professionnels
            </p>
          </div>

          <div className="space-y-8">
            {programmesFormation.map((programme) => (
              <FormationCard key={programme.id} formation={programme} />
            ))}
          </div>

          {/* CTA vers Colibri */}
          <div className="mt-12 text-center">
            <p className="text-light-300 mb-4">
              Retrouvez toutes les informations sur notre plateforme de formation
            </p>
            <a
              href={siteContact.colibriUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Accéder à Colibri
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact />
      <FloatingContact />
    </>
  );
}
