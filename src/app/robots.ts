import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Règle générale - autoriser tous les crawlers
      {
        userAgent: '*',
        allow: '/',
      },
      // ========================================
      // Crawlers IA pour recherche (AUTORISES)
      // Ces bots utilisent le contenu pour répondre aux questions des utilisateurs
      // ========================================
      {
        userAgent: 'GPTBot', // OpenAI ChatGPT
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'OAI-SearchBot', // OpenAI Search
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'ClaudeBot', // Anthropic Claude
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'Claude-Web', // Claude web browsing
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'Anthropic-AI', // Anthropic
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'YouBot', // You.com
        allow: ['/', '/llms.txt'],
      },
      {
        userAgent: 'Phind', // Phind AI
        allow: ['/', '/llms.txt'],
      },
      // ========================================
      // Crawlers Google (AUTORISES)
      // ========================================
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Google AI training - autorisé pour visibilité
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // ========================================
      // Crawlers réseaux sociaux (AUTORISES)
      // ========================================
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      // ========================================
      // Crawlers IA pour entraînement (BLOQUES)
      // Ces bots collectent des données pour entraîner des modèles
      // ========================================
      {
        userAgent: 'CCBot', // Common Crawl - training data
        disallow: '/',
      },
      {
        userAgent: 'cohere-ai', // Cohere training
        disallow: '/',
      },
      {
        userAgent: 'Bytespider', // ByteDance (TikTok)
        disallow: '/',
      },
      {
        userAgent: 'Amazonbot', // Amazon
        disallow: '/',
      },
    ],
    sitemap: 'https://socialsoft.fr/sitemap.xml',
    host: 'https://socialsoft.fr',
  };
}
