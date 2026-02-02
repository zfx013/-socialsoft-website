import { Code, Lightbulb, Server, HardDrive, Cloud, Shield, Headphones, GraduationCap, LucideIcon } from 'lucide-react';

// Import centralisé depuis config.ts
import { siteContact, navigation as navConfig } from './config';

// Re-export pour compatibilité avec le code existant
export const contact = siteContact;
export const navigation = navConfig.main;

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export const services: Service[] = [
  {
    id: 'dev',
    title: 'Développement sur mesure',
    description: 'Sites web, applications métier, logiciels adaptés à vos processus.',
    icon: Code,
    href: '/developpement',
  },
  {
    id: 'conseil',
    title: 'Conseil & ingénierie IT',
    description: 'Audit, architecture, choix technologiques alignés sur vos objectifs.',
    icon: Lightbulb,
    href: '/it',
  },
  {
    id: 'infra',
    title: 'Infrastructure & systèmes',
    description: 'Déploiement, administration, environnements sécurisés et performants.',
    icon: Server,
    href: '/it',
  },
  {
    id: 'baies',
    title: 'Installation de baies serveurs',
    description: 'Serveurs, stockage, réseaux, onduleurs, câblage, mise en production.',
    icon: HardDrive,
    href: '/it',
  },
  {
    id: 'cloud',
    title: 'Cloud & hybridation',
    description: 'Solutions cloud, hybrides ou on-premise selon vos contraintes.',
    icon: Cloud,
    href: '/it',
  },
  {
    id: 'cyber',
    title: 'Cybersécurité',
    description: "Protection des données, sauvegardes, continuité d'activité.",
    icon: Shield,
    href: '/it',
  },
  {
    id: 'support',
    title: 'Maintenance & support',
    description: 'Infogérance, supervision, assistance réactive au quotidien.',
    icon: Headphones,
    href: '/it',
  },
  {
    id: 'formation',
    title: 'Formation professionnelle',
    description: 'Formations certifiées Qualiopi, bureautique et outils numériques.',
    icon: GraduationCap,
    href: '/formation',
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

