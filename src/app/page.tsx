import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Poles from '@/components/sections/Poles';
import Contact from '@/components/sections/Contact';
import FloatingContact from '@/components/ui/FloatingContact';

export const metadata: Metadata = {
  title: 'SOCIAL SOFT - Expert IT, Développement & Formation en Île-de-France',
  description: "SOCIAL SOFT : votre partenaire IT en Val-d'Oise. Infrastructure, développement sur mesure, cybersécurité et formation certifiée Qualiopi. Devis gratuit.",
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
