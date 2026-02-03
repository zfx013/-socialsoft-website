import type { Metadata } from 'next';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez SOCIAL SOFT pour vos projets IT : développement sur mesure, infrastructure, cybersécurité, support. Intervention en Val-d'Oise et Île-de-France.",
  alternates: {
    canonical: 'https://socialsoft.fr/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <h1 className="sr-only">Contactez SOCIAL SOFT</h1>
      <Contact />
    </div>
  );
}
