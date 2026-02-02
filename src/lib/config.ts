// Configuration centralisée du site SOCIAL SOFT
// Modifier uniquement ce fichier pour mettre à jour les données globales

// ============================================
// COORDONNÉES
// ============================================
export const siteContact = {
  company: 'SOCIAL SOFT',
  address: {
    street: '52 Rue des Grandes Côtes',
    city: "Saint-Ouen-l'Aumône",
    postalCode: '95310',
    region: 'Île-de-France',
    country: 'France',
  },
  phone: '0183901406',
  phoneFormatted: '01 83 90 14 06',
  phoneLink: 'tel:+33183901406',
  email: 'contact@socialsoft.fr',
  emailLink: 'mailto:contact@socialsoft.fr',
  linkedin: 'https://www.linkedin.com/company/socialsoft-fr/',
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=52+Rue+des+Grandes+Côtes+95310+Saint-Ouen-l%27Aumône+France",
  colibriUrl: 'https://colibri.socialsoft.fr',
};

// ============================================
// CHIFFRES CLÉS
// ============================================
export const siteStats = {
  projets: {
    value: 250,
    suffix: '+',
    label: 'Projets réalisés',
    description: 'depuis notre création',
  },
  clients: {
    value: 60,
    suffix: '',
    label: 'Clients accompagnés',
    description: 'TPE, PME et associations',
  },
  experience: {
    value: 25,
    suffix: ' ans',
    label: "D'expertise",
    description: 'dans le secteur IT',
  },
  // Répartition clients
  repartition: {
    tpe: { value: 30, label: 'TPE' },
    pme: { value: 20, label: 'PME' },
    associations: { value: 10, label: 'Associations' },
  },
};

// ============================================
// WORDING URGENCE (Option B - sans délai chiffré)
// ============================================
export const urgenceWording = {
  short: 'Prise en charge rapide',
  full: 'Prise en charge rapide de vos urgences',
  description: 'Délais d\'intervention garantis sur contrat (SLA)',
  details: 'Contrats adaptables selon vos besoins critiques',
};

// ============================================
// NAVIGATION
// ============================================
export const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    {
      name: 'Nos pôles',
      href: '#',
      dropdown: true,
      items: [
        { name: 'IT & Infrastructure', href: '/it', description: 'Infogérance, support, cybersécurité' },
        { name: 'Développement', href: '/developpement', description: 'Sites web, applications, logiciels' },
        { name: 'Formation', href: '/formation', description: 'Colibri - Formations certifiées' },
      ],
    },
    { name: 'Pourquoi nous', href: '/pourquoi-nous' },
    { name: 'Contact', href: '/#contact' },
  ],
  footer: [
    { name: 'IT & Infrastructure', href: '/it' },
    { name: 'Développement', href: '/developpement' },
    { name: 'Formation Colibri', href: '/formation' },
    { name: 'Pourquoi nous', href: '/pourquoi-nous' },
    { name: 'Contact', href: '/#contact' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
  ],
};

// ============================================
// PÔLES D'ACTIVITÉ
// ============================================
export const poles = [
  {
    id: 'it',
    title: 'IT & Infrastructure',
    subtitle: 'Infogérance & Support',
    description: 'Supervision, maintenance, cybersécurité, réseaux et serveurs. Prise en charge rapide de vos urgences avec des SLA adaptés à vos besoins.',
    href: '/it',
    icon: 'Server',
    features: ['Infogérance 24/7', 'Cybersécurité', 'Cloud & Hybride', 'Support réactif'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'dev',
    title: 'Développement',
    subtitle: 'Logiciel & Web',
    description: 'Sites web, applications métier, outils sur mesure, intégrations et automatisations. Des solutions qui évoluent avec votre entreprise.',
    href: '/developpement',
    icon: 'Code',
    features: ['Sites web', 'Applications métier', 'Intégrations API', 'Maintenance'],
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'formation',
    title: 'Formation',
    subtitle: 'Colibri',
    description: 'Formations certifiées Qualiopi pour monter en compétences sur les outils numériques. Programmes adaptés à tous les niveaux.',
    href: '/formation',
    icon: 'GraduationCap',
    features: ['Certifié Qualiopi', 'Sur mesure', 'Tous niveaux', 'Éligible OPCO'],
    gradient: 'from-emerald-500 to-teal-500',
  },
];

// ============================================
// SERVICES IT (pour page /it)
// ============================================
export const servicesIT = [
  {
    title: 'Infogérance',
    description: 'Supervision proactive 24/7, maintenance préventive et curative, gestion complète de votre parc informatique.',
    icon: 'Monitor',
  },
  {
    title: 'Cybersécurité',
    description: 'Protection contre les cyberattaques, antivirus/EDR, pare-feu nouvelle génération, audits de sécurité.',
    icon: 'Shield',
  },
  {
    title: 'Infrastructure réseau',
    description: 'Installation de baies serveurs, câblage structuré, WiFi professionnel, VPN sécurisés.',
    icon: 'Network',
  },
  {
    title: 'Cloud & Hybride',
    description: 'Migration cloud, Microsoft 365, Azure/AWS, solutions hybrides adaptées à vos contraintes.',
    icon: 'Cloud',
  },
  {
    title: 'Sauvegarde & PRA',
    description: 'Sauvegardes automatisées (règle 3-2-1), plan de reprise d\'activité, continuité de service.',
    icon: 'HardDrive',
  },
  {
    title: 'Support technique',
    description: 'Assistance réactive, prise en main à distance, interventions sur site en Île-de-France.',
    icon: 'Headphones',
  },
];

// ============================================
// SERVICES DÉVELOPPEMENT (pour page /developpement)
// ============================================
export const servicesDev = [
  {
    title: 'Sites web sur mesure',
    description: 'Sites vitrines, e-commerce, applications web. Design moderne et performance optimale.',
    icon: 'Globe',
  },
  {
    title: 'Applications métier',
    description: 'Logiciels sur mesure adaptés à vos processus : CRM, ERP, gestion de stocks, planification.',
    icon: 'Layers',
  },
  {
    title: 'Applications mobiles',
    description: 'Apps iOS et Android, solutions cross-platform avec React Native ou Flutter.',
    icon: 'Smartphone',
  },
  {
    title: 'APIs & Intégrations',
    description: 'Connexion de vos outils, automatisation des flux, développement d\'APIs robustes.',
    icon: 'Plug',
  },
  {
    title: 'Maintenance applicative',
    description: 'Évolutions, corrections, optimisations. Vos applications restent performantes et sécurisées.',
    icon: 'Wrench',
  },
  {
    title: 'Conseil technique',
    description: 'Audit de code, architecture logicielle, choix technologiques alignés sur vos objectifs.',
    icon: 'Lightbulb',
  },
];

// ============================================
// PROGRAMMES FORMATION (pour page /formation - Qualiopi)
// ============================================
export const programmesFormation = [
  {
    id: 'bureautique',
    title: 'Maîtrisez les bases de Windows, Word, Excel et Internet',
    duration: 'Dates à venir',
    level: 'Tout public - Niveau débutant',
    description: 'Cette formation vous offre une découverte pratique de Windows, Word, Excel, Outlook et de la navigation sur Internet. Vous apprendrez à organiser votre poste de travail, à naviguer efficacement sur le web, à créer des courriers simples avec Word, à gérer des tableaux basiques dans Excel, et à utiliser Outlook pour vos courriels et agendas.',
    objectives: [
      'Naviguer sur le Web et rechercher une information',
      'Prendre en main le système d\'exploitation Windows',
      'Mettre en forme un courrier simple avec Word',
      'Créer un tableau simple avec Excel',
      'Utiliser Outlook de manière optimale (agendas, signature, recherche)',
    ],
    eligible: ['OPCO', 'CPF', 'Plan de formation'],
    link: 'https://colibri.socialsoft.fr/offerings/',
  },
];

// ============================================
// WHY US (pour page /pourquoi-nous)
// ============================================
export const whyUsReasons = [
  {
    title: 'Interlocuteur unique',
    description: 'Un seul contact pour tous vos besoins IT. Fini la multiplication des prestataires et les pertes d\'information.',
  },
  {
    title: 'Prise en charge globale',
    description: 'Du conseil initial à la maintenance quotidienne, nous gérons l\'ensemble de votre système d\'information.',
  },
  {
    title: 'Solutions sur mesure',
    description: 'Pas de packages standardisés. Chaque solution est conçue et adaptée à votre contexte et vos objectifs.',
  },
  {
    title: 'Vision long terme',
    description: 'Performance, sécurité, évolutivité : nous construisons des solutions durables qui grandissent avec vous.',
  },
  {
    title: '25 ans d\'expertise',
    description: 'Une équipe expérimentée qui a accompagné des centaines de projets IT, de la TPE à la PME.',
  },
  {
    title: 'Proximité Île-de-France',
    description: 'Basés dans le Val-d\'Oise, nous intervenons rapidement sur site dans toute l\'Île-de-France.',
  },
];

// ============================================
// MÉTHODOLOGIE (pour page /pourquoi-nous)
// ============================================
export const methodology = [
  {
    step: 1,
    title: 'Écoute & Audit',
    description: 'Analyse approfondie de vos besoins, contraintes et objectifs. Premier audit gratuit.',
  },
  {
    step: 2,
    title: 'Proposition',
    description: 'Solution technique détaillée, planning et budget transparent. Pas de surprise.',
  },
  {
    step: 3,
    title: 'Réalisation',
    description: 'Mise en œuvre par nos équipes avec suivi régulier et points d\'avancement.',
  },
  {
    step: 4,
    title: 'Accompagnement',
    description: 'Formation, documentation et support continu. Nous restons à vos côtés.',
  },
];
