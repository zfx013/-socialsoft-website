import type { Metadata } from 'next';
import { Code, Globe, Layers, Smartphone, Plug, Wrench, Lightbulb, CheckCircle } from 'lucide-react';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';
import HeroCTA from '@/components/ui/HeroCTA';
import { servicesDev, siteStats, siteContact } from '@/lib/config';

export const metadata: Metadata = {
  title: "Développement Web & Logiciel | Applications Sur Mesure",
  description: "Développement de sites web, applications métier et logiciels sur mesure. Solutions personnalisées pour PME : React, Next.js, Node.js. Devis gratuit.",
  alternates: {
    canonical: 'https://socialsoft.fr/developpement',
  },
  openGraph: {
    title: "Développement Web & Logiciel | SOCIAL SOFT",
    description: "Sites web, applications métier, logiciels sur mesure. 25 ans d'expertise en développement pour PME.",
  },
};

const iconMap = {
  Globe,
  Layers,
  Smartphone,
  Plug,
  Wrench,
  Lightbulb,
} as const;

type IconKey = keyof typeof iconMap;

const technologies = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'PHP', 'NestJS', 'Express'] },
  { category: 'Mobile', items: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { category: 'Base de données', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'Azure', 'Vercel', 'CI/CD'] },
];

export default function DeveloppementPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-dark-900 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm text-violet-400 mb-6">
              <Code className="w-4 h-4" />
              Développement
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-100 mb-6">
              Développement<br />
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Web & Logiciel
              </span>
            </h1>

            <p className="text-xl text-light-200 mb-8 leading-relaxed">
              Des solutions sur mesure qui s&apos;adaptent à vos processus métier.
              Sites web modernes, applications métier, intégrations API et maintenance
              applicative pour faire évoluer votre entreprise.
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-light-100">{siteStats.experience.value}+</p>
                  <p className="text-sm text-light-400">ans d&apos;expertise</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Code className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-light-100">Sur mesure</p>
                  <p className="text-sm text-light-400">solutions adaptées</p>
                </div>
              </div>
            </div>

            {/* Badge associations */}
            <p className="text-sm text-emerald-400 mb-8">
              ✓ Également pour les Associations — tarifs adaptés
            </p>

            {/* CTA */}
            <HeroCTA
              primaryText="Discuter de votre projet"
              primaryHref="#contact"
              phoneNumber={siteContact.phoneFormatted}
              phoneLink={siteContact.phoneLink}
              gradientFrom="from-violet-500"
              gradientTo="to-purple-500"
              hoverBorderColor="hover:border-violet-500/50"
              phoneIconColor="text-violet-400"
            />
          </div>
        </div>
      </section>

      {/* Services Développement */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Nos expertises développement
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Du site vitrine à l&apos;application métier complexe, nous concevons des solutions adaptées à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesDev.map((service, index) => {
              const Icon = iconMap[service.icon as IconKey] || Code;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-dark-700/50 border border-dark-600 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-light-100 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-light-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Technologies maîtrisées
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Un stack technique moderne pour des applications performantes et maintenables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-dark-800/50 border border-dark-600"
              >
                <h3 className="text-lg font-semibold text-violet-400 mb-4">
                  {tech.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-dark-700 text-light-300 border border-dark-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Notre méthodologie projet
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Une approche itérative et collaborative pour des projets réussis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Analyse', desc: 'Compréhension de vos besoins et définition du périmètre' },
              { step: 2, title: 'Conception', desc: 'Maquettes, architecture technique et validation' },
              { step: 3, title: 'Développement', desc: 'Réalisation itérative avec points réguliers' },
              { step: 4, title: 'Livraison', desc: 'Tests, déploiement et formation' },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-dark-700/50 border border-dark-600"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-light-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-light-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact />
      <FloatingContact />
    </>
  );
}
