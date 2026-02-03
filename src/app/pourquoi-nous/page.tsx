import type { Metadata } from 'next';
import { CheckCircle, Users, Target, Shield, Clock, Lightbulb, MapPin } from 'lucide-react';
import Clients from '@/components/sections/Clients';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';
import MethodologyTimeline from '@/components/sections/MethodologyTimeline';
import HeroCTA from '@/components/ui/HeroCTA';
import { whyUsReasons, siteStats, siteContact } from '@/lib/config';

export const metadata: Metadata = {
  title: "Pourquoi nous choisir | SOCIAL SOFT",
  description: "25 ans d'expertise IT en Île-de-France. Interlocuteur unique, solutions sur mesure, réactivité garantie. Plus de 60 clients TPE/PME accompagnés. Découvrez notre approche.",
  alternates: {
    canonical: 'https://socialsoft.fr/pourquoi-nous',
  },
  openGraph: {
    title: "Pourquoi choisir SOCIAL SOFT",
    description: "25 ans d'expertise, 60+ clients, interlocuteur unique. Infogérance, développement et formation pour PME en Île-de-France.",
  },
};

const iconMap = {
  'Interlocuteur unique': Users,
  'Prise en charge globale': Target,
  'Solutions sur mesure': Lightbulb,
  'Vision long terme': Shield,
  "25 ans d'expertise": Clock,
  'Proximité Île-de-France': MapPin,
} as const;

type IconKey = keyof typeof iconMap;

export default function PourquoiNousPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-dark-900 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
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
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 mb-6">
              <CheckCircle className="w-4 h-4" />
              Notre engagement
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-100 mb-6">
              Pourquoi choisir<br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                SOCIAL SOFT
              </span>
            </h1>

            <p className="text-xl text-light-200 mb-8 leading-relaxed">
              Depuis {siteStats.experience.value} ans, nous accompagnons les entreprises d&apos;Île-de-France
              dans leur transformation numérique. Un partenaire de confiance pour votre IT.
            </p>

            {/* Key stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-light-100">{siteStats.experience.value}+</p>
                <p className="text-sm text-light-400">ans d&apos;expertise</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-light-100">{siteStats.clients.value}+</p>
                <p className="text-sm text-light-400">clients accompagnés</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-light-100">{siteStats.projets.value}+</p>
                <p className="text-sm text-light-400">projets réalisés</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <HeroCTA
                primaryText="Discuter de votre projet"
                primaryHref="#contact"
                phoneNumber={siteContact.phoneFormatted}
                phoneLink={siteContact.phoneLink}
                gradientFrom="from-blue-500"
                gradientTo="to-violet-500"
                hoverBorderColor="hover:border-blue-500/50"
                phoneIconColor="text-blue-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-100 mb-4">
              Ce qui nous différencie
            </h2>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Une approche unique centrée sur vos besoins et votre réussite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUsReasons.map((reason, index) => {
              const Icon = iconMap[reason.title as IconKey] || CheckCircle;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-dark-700 to-dark-800 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 overflow-hidden shadow-lg shadow-blue-500/5"
                >
                  {/* Glow effect - visible by default, stronger on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-violet-500/5 group-hover:from-blue-500/15 group-hover:to-violet-500/10 transition-all duration-300" />

                  {/* Corner accent - visible by default */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full group-hover:from-blue-500/30 transition-all duration-300" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/40 to-violet-500/30 flex items-center justify-center mb-4 shadow-md shadow-blue-500/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                      <Icon className="w-7 h-7 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    </div>
                    <h3 className="text-xl font-semibold text-light-100 mb-3 group-hover:text-white transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-light-300 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>

                  {/* Bottom line accent - visible by default */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover:via-blue-500/70 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre méthodologie */}
      <MethodologyTimeline />

      {/* Témoignages clients */}
      <Clients />

      {/* FAQ */}
      <FAQ />

      {/* Contact */}
      <Contact />
      <FloatingContact />
    </>
  );
}
