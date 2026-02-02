import { Code, Lightbulb, Server, HardDrive, Cloud, Shield, Headphones, LucideIcon } from 'lucide-react';

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

