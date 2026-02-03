'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { contact } from '@/lib/constants';
import { navigation } from '@/lib/config';
import { trackEvent } from '@/lib/tracking';

const services = [
  { name: 'Développement sur mesure', href: '/developpement' },
  { name: 'Applications métier', href: '/developpement' },
  { name: 'Infrastructure & Réseaux', href: '/it' },
  { name: 'Cybersécurité', href: '/it' },
  { name: 'Support & Maintenance', href: '/it' },
  { name: 'Cloud & Hébergement', href: '/it' },
  { name: 'Formation Bureautique', href: '/formation' },
  { name: 'Formation Qualiopi', href: '/formation' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer ref={footerRef} className="relative bg-dark-900 overflow-hidden">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial={false}
          animate={isInView ? 'visible' : 'hidden'}
          className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12"
        >
          {/* Company info */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Image
              src="/images/logo-white.svg"
              alt="SOCIAL SOFT"
              width={150}
              height={40}
              className="h-10 w-auto mb-6"
            />
            <p className="text-light-300 leading-relaxed mb-6">
              Votre partenaire IT de la conception à l&apos;exploitation.
              Accompagnement complet pour TPE et PME en Île-de-France.
            </p>

            {/* Social link */}
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('linkedin_click')}
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-dark-800 border border-dark-700 hover:border-accent-blue/50 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
                <Linkedin className="w-4 h-4 text-white" />
              </div>
              <span className="text-light-200 group-hover:text-light-100 transition-colors">
                Suivez-nous
              </span>
              <ArrowUpRight className="w-4 h-4 text-light-400 group-hover:text-accent-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-light-100 font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-accent-blue to-transparent" />
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-light-400 hover:text-light-100 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-blue/50 group-hover:bg-accent-blue transition-colors" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="text-light-100 font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-accent-cyan to-transparent" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.footer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-light-400 hover:text-light-100 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-cyan/50 group-hover:bg-accent-cyan transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <h3 className="text-light-100 font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-accent-blue to-accent-cyan" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={contact.phoneLink}
                  onClick={() => trackEvent('phone_click')}
                  className="flex items-center gap-3 text-light-300 hover:text-light-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                    <Phone className="w-4 h-4 text-accent-blue" />
                  </div>
                  <span className="text-sm">{contact.phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.emailLink}
                  onClick={() => trackEvent('email_click')}
                  className="flex items-center gap-3 text-light-300 hover:text-light-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                    <Mail className="w-4 h-4 text-accent-blue" />
                  </div>
                  <span className="text-sm">{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('address_click')}
                  className="flex items-start gap-3 text-light-300 hover:text-light-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors flex-shrink-0">
                    <MapPin className="w-4 h-4 text-accent-blue" />
                  </div>
                  <span className="text-sm leading-relaxed">
                    {contact.address.street}
                    <br />
                    {contact.address.postalCode} {contact.address.city}
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={false}
          animate={{ opacity: isInView ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
          className="py-6 border-t border-dark-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-light-500 text-sm">
              &copy; {currentYear} {contact.company}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="/mentions-legales"
                className="text-light-500 hover:text-light-300 text-sm transition-colors"
              >
                Mentions légales
              </a>
              <a
                href="/politique-confidentialite"
                className="text-light-500 hover:text-light-300 text-sm transition-colors"
              >
                Confidentialité
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
