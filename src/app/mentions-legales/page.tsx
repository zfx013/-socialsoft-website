'use client';

import { motion } from 'framer-motion';
import { contact } from '@/lib/constants';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-dark-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-light-100 mb-8">
            Mentions <span className="text-gradient">légales</span>
          </h1>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Éditeur */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                1. Éditeur du site
              </h2>
              <div className="text-light-300 space-y-2">
                <p><strong className="text-light-100">Raison sociale :</strong> <span className="select-all">{contact.company}</span></p>
                <p><strong className="text-light-100">Adresse :</strong> <span className="select-all">{contact.address.street}, {contact.address.postalCode} {contact.address.city}</span></p>
                <p><strong className="text-light-100">Téléphone :</strong> <span className="select-all">{contact.phoneFormatted}</span></p>
                <p><strong className="text-light-100">Email :</strong> <span className="select-all">{contact.email}</span></p>
                <p><strong className="text-light-100">SIRET :</strong> <span className="select-all">881 685 077 00011</span></p>
                <p><strong className="text-light-100">Directrice de la publication :</strong> Géraldine BLIN, Présidente</p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                2. Hébergement
              </h2>
              <div className="text-light-300 space-y-2">
                <p><strong className="text-light-100">Hébergeur :</strong> <span className="select-all">{contact.company}</span></p>
                <p><strong className="text-light-100">Adresse :</strong> <span className="select-all">{contact.address.street}, {contact.address.postalCode} {contact.address.city}</span></p>
                <p><strong className="text-light-100">Téléphone :</strong> <span className="select-all">{contact.phoneFormatted}</span></p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                3. Propriété intellectuelle
              </h2>
              <p className="text-light-300">
                L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les
                documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p className="text-light-300 mt-4">
                La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            {/* Données personnelles */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                4. Données personnelles
              </h2>
              <p className="text-light-300">
                Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par {contact.company} pour la gestion de notre relation client et l&apos;envoi de communications commerciales.
              </p>
              <p className="text-light-300 mt-4">
                Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d&apos;accès aux données
                vous concernant et les faire rectifier en contactant : <a href={contact.emailLink} className="text-accent-blue hover:underline select-all">{contact.email}</a>
              </p>
              <p className="text-light-300 mt-4">
                Pour plus d&apos;informations sur la gestion de vos données personnelles, consultez notre{' '}
                <a href="/politique-confidentialite" className="text-accent-blue hover:underline">
                  Politique de confidentialité
                </a>.
              </p>
            </section>

            {/* Cookies */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                5. Cookies
              </h2>
              <p className="text-light-300">
                Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et réaliser des statistiques
                de visites. En poursuivant votre navigation sur ce site, vous acceptez l&apos;utilisation de cookies.
              </p>
              <p className="text-light-300 mt-4">
                Vous pouvez vous opposer à l&apos;enregistrement de cookies en configurant votre navigateur.
              </p>
            </section>

            {/* Liens hypertextes */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                6. Liens hypertextes
              </h2>
              <p className="text-light-300">
                Les liens hypertextes mis en place dans le cadre du présent site internet en direction d&apos;autres
                ressources présentes sur le réseau Internet ne sauraient engager la responsabilité de {contact.company}.
              </p>
            </section>

            {/* Limitation de responsabilité */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                7. Limitation de responsabilité
              </h2>
              <p className="text-light-300">
                {contact.company} ne saurait être tenu responsable des dommages directs ou indirects causés au matériel
                de l&apos;utilisateur, lors de l&apos;accès au site, et résultant soit de l&apos;utilisation d&apos;un matériel ne
                répondant pas aux spécifications techniques requises, soit de l&apos;apparition d&apos;un bug ou d&apos;une
                incompatibilité.
              </p>
            </section>

            {/* Droit applicable */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                8. Droit applicable
              </h2>
              <p className="text-light-300">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux
                français seront seuls compétents.
              </p>
            </section>
          </div>

          {/* Retour */}
          <motion.a
            href="/"
            className="inline-flex items-center gap-2 mt-10 text-accent-blue hover:text-accent-cyan transition-colors"
            whileHover={{ x: -5 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à l&apos;accueil
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
