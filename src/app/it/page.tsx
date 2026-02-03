import type { Metadata } from 'next';
import { Server, Shield, Network, Cloud, HardDrive, Headphones, CheckCircle, Zap } from 'lucide-react';
import Coverage from '@/components/sections/Coverage';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';
import HeroCTA from '@/components/ui/HeroCTA';
import { servicesIT, siteStats, siteContact } from '@/lib/config';

export const metadata: Metadata = {
  title: "IT & Infrastructure | Infogérance PME Île-de-France",
  description: "Services d'infogérance et infrastructure IT pour TPE/PME en Île-de-France. Supervision 24/7, cybersécurité, cloud, support technique. Intervention rapide sur site.",
  alternates: {
    canonical: 'https://socialsoft.fr/it',
  },
  openGraph: {
    title: "IT & Infrastructure | SOCIAL SOFT",
    description: "Infogérance, cybersécurité, infrastructure réseau pour PME. 25 ans d'expertise IT en Île-de-France.",
  },
};

const iconMap = {
  Monitor: Server,
  Shield,
  Network,
  Cloud,
  HardDrive,
  Headphones,
} as const;

type IconKey = keyof typeof iconMap;

export default function ITPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-dark-900 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 mb-6">
              <Server className="w-4 h-4" />
              IT & Infrastructure
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-100 mb-6">
              Infogérance &<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Infrastructure IT
              </span>
            </h1>

            <p className="text-xl text-light-200 mb-8 leading-relaxed">
              Externalisez la gestion de votre système d&apos;information en toute sérénité.
              Supervision proactive, maintenance préventive, cybersécurité et support réactif
              pour votre entreprise.
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-light-100">{siteStats.experience.value}+</p>
                  <p className="text-sm text-light-400">ans d&apos;expertise</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-light-100">Réactivité</p>
                  <p className="text-sm text-light-400">Intervention rapide</p>
                </div>
              </div>
            </div>

            {/* Badge associations */}
            <p className="text-sm text-emerald-400 mb-8">
              ✓ Également pour les Associations
            </p>

            {/* CTA */}
            <HeroCTA
              primaryText="Demander un devis"
              primaryHref="#contact"
              phoneNumber={siteContact.phoneFormatted}
              phoneLink={siteContact.phoneLink}
              gradientFrom="from-blue-500"
              gradientTo="to-cyan-500"
              hoverBorderColor="hover:border-blue-500/50"
              phoneIconColor="text-blue-400"
            />
          </div>
        </div>
      </section>

      {/* Services IT */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Nos services IT
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Une gamme complète de services pour gérer et sécuriser votre infrastructure informatique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesIT.map((service, index) => {
              const Icon = iconMap[service.icon as IconKey] || Server;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-dark-700/50 border border-dark-600 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-400" />
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

      {/* Réactivité garantie */}
      <section className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-400 mb-6">
              <Zap className="w-4 h-4" />
              Réactivité garantie
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-6">
              Un support réactif à vos côtés
            </h2>
            <p className="text-lg text-light-200 mb-8 leading-relaxed">
              Notre équipe intervient rapidement pour résoudre vos problèmes informatiques.
              Nous adaptons notre accompagnement selon vos besoins spécifiques.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-600">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-light-200">Support téléphonique et prise en main à distance immédiats</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-600">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-light-200">Intervention sur site rapide en Île-de-France</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-600">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-light-200">Accompagnement adapté aux besoins critiques</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-dark-800/50 border border-dark-600">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-light-200">Astreinte disponible selon votre contrat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <Coverage />

      {/* Contact */}
      <Contact />
      <FloatingContact />
    </>
  );
}
