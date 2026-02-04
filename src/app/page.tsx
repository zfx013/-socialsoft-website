import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Poles from '@/components/sections/Poles';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';

export const metadata: Metadata = {
  title: 'SOCIAL SOFT - Expert IT, Développement & Formation en Île-de-France',
  description: "SOCIAL SOFT : boîte de support IT et développement sur mesure dans le Val-d'Oise (95). Infogérance, cybersécurité, infrastructure pour TPE, PME et associations en Île-de-France. Formation certifiée Qualiopi. 4.9/5 - Devis gratuit.",
  alternates: {
    canonical: 'https://socialsoft.fr',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Poles />
      <Contact />
      <FloatingContact />
    </>
  );
}
