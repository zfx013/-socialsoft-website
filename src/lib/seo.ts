import type { Metadata } from 'next';

export const siteConfig = {
  name: 'SOCIAL SOFT',
  url: 'https://www.socialsoft.fr',
  ogImage: '/og-image.jpg',
  description:
    "Entreprise IT à Saint-Ouen-l'Aumône : développement sur mesure, infrastructure, cybersécurité, support. Accompagnement complet pour TPE et PME en Île-de-France.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SOCIAL SOFT | Services IT sur mesure - Val-d'Oise & Île-de-France",
    template: '%s | SOCIAL SOFT',
  },
  description: siteConfig.description,
  keywords: [
    "services IT Val-d'Oise",
    'développement logiciel sur mesure',
    'infrastructure informatique Île-de-France',
    'cybersécurité PME',
    'infogérance 95',
    'installation baie serveur',
    'support informatique entreprise',
    'SOCIAL SOFT',
  ],
  authors: [{ name: 'SOCIAL SOFT' }],
  creator: 'SOCIAL SOFT',
  publisher: 'SOCIAL SOFT',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'SOCIAL SOFT | Services IT sur mesure',
    description:
      "Votre partenaire IT de la conception à l'exploitation. Développement, infrastructure, cybersécurité, support.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'SOCIAL SOFT - Services IT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOCIAL SOFT | Services IT sur mesure',
    description: "Votre partenaire IT de la conception à l'exploitation.",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.socialsoft.fr/#organization',
  name: 'SOCIAL SOFT',
  description:
    'Entreprise de services IT : développement sur mesure, infrastructure, cybersécurité, support informatique.',
  url: 'https://www.socialsoft.fr',
  logo: 'https://www.socialsoft.fr/images/logo-color.svg',
  image: 'https://www.socialsoft.fr/og-image.jpg',
  telephone: '+33782251099',
  email: 'support@socialsoft.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '52 Rue des Grandes Côtes',
    addressLocality: "Saint-Ouen-l'Aumône",
    postalCode: '95310',
    addressRegion: 'Île-de-France',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 49.0419,
    longitude: 2.1097,
  },
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: "Val-d'Oise",
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Île-de-France',
    },
    {
      '@type': 'Country',
      name: 'France',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services IT',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Développement sur mesure',
          description: 'Applications web et métier, intégrations API, automatisation de processus',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Infrastructure & Réseaux',
          description: 'Installation et maintenance de baies serveurs, câblage, switches, routeurs',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cybersécurité',
          description: 'Audits de sécurité, pare-feu, protection des données, conformité RGPD',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Support & Maintenance',
          description: 'Helpdesk, maintenance préventive et curative, télémaintenance',
        },
      },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: '€€',
  sameAs: ['https://www.linkedin.com/company/socialsoft-fr/'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
};

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quels types d'entreprises accompagnez-vous ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nous accompagnons principalement les TPE et PME de 1 à 250 salariés. Notre expertise couvre tous les secteurs d'activité.",
      },
    },
    {
      '@type': 'Question',
      name: 'Intervenez-vous en urgence ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, nous proposons un service d'intervention d'urgence pour nos clients sous contrat de maintenance. Délai de 4h pour les urgences critiques.",
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous du support à distance ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolument ! Notre équipe peut intervenir à distance sur la majorité des problématiques via des outils de prise en main sécurisés.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment se déroule un projet de développement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chaque projet suit notre méthodologie éprouvée : analyse des besoins, conception, développement itératif avec vos retours, tests approfondis, déploiement et formation. Vous êtes impliqué à chaque étape.',
      },
    },
    {
      '@type': 'Question',
      name: "Quelles sont vos zones d'intervention ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nous intervenons sur site dans tout le Val-d'Oise et l'Île-de-France. Pour le support à distance, nous couvrons la France entière et même l'international.",
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous des contrats de maintenance ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, nous proposons plusieurs formules de maintenance adaptées à vos besoins : de la maintenance préventive à l'infogérance complète, avec des SLA garantis.",
      },
    },
  ],
};
