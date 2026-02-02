import type { Metadata } from 'next';
import { Award, Clock, Users, BookOpen, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';
import FormationHero from '@/components/sections/FormationHero';
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
      <section className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Nos programmes de formation
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Découvrez nos formations certifiées, conçues pour répondre aux besoins des professionnels
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programmesFormation.map((programme) => (
              <div
                key={programme.id}
                className="p-8 rounded-3xl bg-dark-800/50 border border-dark-600 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-light-100 mb-2">
                      {programme.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
                        <Clock className="w-3 h-3" />
                        {programme.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-teal-500/10 text-teal-400">
                        {programme.level}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-light-300 mb-6 leading-relaxed">
                  {programme.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-light-100 mb-3">Objectifs de la formation</h4>
                  <ul className="space-y-2">
                    {programme.objectives.map((objective, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-light-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-dark-600">
                  <div className="flex flex-wrap gap-2">
                    {programme.eligible.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs font-medium rounded bg-dark-700 text-light-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <a
                    href={programme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA vers Colibri */}
          <div className="mt-12 text-center">
            <p className="text-light-300 mb-4">
              Retrouvez l&apos;ensemble de nos programmes sur notre plateforme de formation
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

      {/* Financement */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-sm text-teal-400 mb-6">
                <Award className="w-4 h-4" />
                Certification Qualiopi
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-6">
                Des formations financées
              </h2>
              <p className="text-lg text-light-200 mb-6 leading-relaxed">
                Notre certification Qualiopi atteste de la qualité de nos formations et vous permet
                de bénéficier de financements pour former vos équipes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-light-200">Prise en charge par votre OPCO (selon conditions)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-light-200">Éligibilité au Compte Personnel de Formation (CPF)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-light-200">Intégration dans votre plan de formation entreprise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span className="text-light-200">Accompagnement dans vos démarches de financement</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-dark-700 to-dark-800 border border-dark-600">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-light-100 mb-2">Qualiopi</h3>
                  <p className="text-light-300">Certification qualité des formations</p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-dark-900/50 border border-dark-600">
                    <p className="text-sm text-light-300 text-center">
                      Processus certifié pour les actions de formation professionnelle
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <p className="text-sm text-light-200 text-center font-medium">
                      Gage de qualité et d&apos;éligibilité aux financements publics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact />
      <FloatingContact />
    </>
  );
}
