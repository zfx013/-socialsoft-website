import { Code, Lightbulb, Server, HardDrive, Cloud, Shield, Headphones, LucideIcon } from 'lucide-react';

export const contact = {
  company: 'SOCIAL SOFT',
  address: {
    street: '52 Rue des Grandes Côtes',
    city: "Saint-Ouen-l'Aumône",
    postalCode: '95310',
    region: 'Île-de-France',
    country: 'France',
  },
  phone: '0782251099',
  phoneFormatted: '07 82 25 10 99',
  phoneLink: 'tel:+33782251099',
  email: 'support@socialsoft.fr',
  emailLink: 'mailto:support@socialsoft.fr',
  linkedin: 'https://www.linkedin.com/company/socialsoft-fr/',
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=52+Rue+des+Grandes+Côtes+95310+Saint-Ouen-l%27Aumône+France",
};

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    id: 'dev',
    title: 'Développement sur mesure',
    description: 'Sites web, applications métier, logiciels adaptés à vos processus.',
    icon: Code,
  },
  {
    id: 'conseil',
    title: 'Conseil & ingénierie IT',
    description: 'Audit, architecture, choix technologiques alignés sur vos objectifs.',
    icon: Lightbulb,
  },
  {
    id: 'infra',
    title: 'Infrastructure & systèmes',
    description: 'Déploiement, administration, environnements sécurisés et performants.',
    icon: Server,
  },
  {
    id: 'baies',
    title: 'Installation de baies serveurs',
    description: 'Serveurs, stockage, réseaux, onduleurs, câblage, mise en production.',
    icon: HardDrive,
  },
  {
    id: 'cloud',
    title: 'Cloud & hybridation',
    description: 'Solutions cloud, hybrides ou on-premise selon vos contraintes.',
    icon: Cloud,
  },
  {
    id: 'cyber',
    title: 'Cybersécurité',
    description: "Protection des données, sauvegardes, continuité d'activité.",
    icon: Shield,
  },
  {
    id: 'support',
    title: 'Maintenance & support',
    description: 'Infogérance, supervision, assistance réactive au quotidien.',
    icon: Headphones,
  },
];

export const whyUs = [
  {
    title: 'Interlocuteur unique',
    description: 'Un seul contact pour tous vos besoins IT. Fini la multiplication des prestataires.',
  },
  {
    title: 'Prise en charge globale',
    description: "Du conseil initial à la maintenance quotidienne, nous gérons l'ensemble.",
  },
  {
    title: 'Solutions sur mesure',
    description: 'Pas de packages standardisés. Chaque solution est adaptée à votre contexte.',
  },
  {
    title: 'Vision long terme',
    description: 'Performance, sécurité, évolutivité : nous construisons pour durer.',
  },
];

export const navigation = [
  { name: 'Services', href: '/#services' },
  { name: 'Pourquoi nous', href: '/#pourquoi-nous' },
  { name: 'Clients', href: '/#clients' },
  { name: 'Contact', href: '/#contact' },
];
