'use client';

import { motion } from 'framer-motion';
import { contact } from '@/lib/constants';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-dark-900 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-light-100 mb-8">
            Politique de <span className="text-gradient">confidentialité</span>
          </h1>

          <p className="text-light-300 mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            {/* Introduction */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                1. Introduction
              </h2>
              <p className="text-light-300">
                {contact.company} s&apos;engage à protéger la vie privée des utilisateurs de son site internet.
                La présente politique de confidentialité explique comment nous collectons, utilisons et protégeons
                vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            {/* Responsable du traitement */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                2. Responsable du traitement
              </h2>
              <div className="text-light-300 space-y-2">
                <p><strong className="text-light-100">Raison sociale :</strong> <span className="select-all">{contact.company}</span></p>
                <p><strong className="text-light-100">Adresse :</strong> <span className="select-all">{contact.address.street}, {contact.address.postalCode} {contact.address.city}</span></p>
                <p><strong className="text-light-100">Email :</strong> <a href={contact.emailLink} className="text-accent-blue hover:underline select-all">{contact.email}</a></p>
              </div>
            </section>

            {/* Données collectées */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                3. Données collectées
              </h2>
              <p className="text-light-300 mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc list-inside text-light-300 space-y-2">
                <li><strong className="text-light-100">Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                <li><strong className="text-light-100">Données de l&apos;entreprise :</strong> nom de l&apos;entreprise, fonction</li>
                <li><strong className="text-light-100">Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
                <li><strong className="text-light-100">Données de contact :</strong> contenu des messages envoyés via le formulaire de contact</li>
              </ul>
            </section>

            {/* Finalités */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                4. Finalités du traitement
              </h2>
              <p className="text-light-300 mb-4">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-light-300 space-y-2">
                <li>Répondre à vos demandes de contact et de devis</li>
                <li>Gérer la relation commerciale</li>
                <li>Améliorer nos services et notre site web</li>
                <li>Établir des statistiques de fréquentation</li>
                <li>Envoyer des communications commerciales (avec votre consentement)</li>
              </ul>
            </section>

            {/* Base légale */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                5. Base légale
              </h2>
              <p className="text-light-300">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc list-inside text-light-300 space-y-2 mt-4">
                <li><strong className="text-light-100">Votre consentement</strong> pour l&apos;envoi de communications commerciales</li>
                <li><strong className="text-light-100">L&apos;exécution d&apos;un contrat</strong> ou mesures précontractuelles</li>
                <li><strong className="text-light-100">L&apos;intérêt légitime</strong> de {contact.company} pour l&apos;amélioration de ses services</li>
              </ul>
            </section>

            {/* Durée de conservation */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                6. Durée de conservation
              </h2>
              <p className="text-light-300">
                Vos données personnelles sont conservées pendant une durée de 3 ans à compter de notre dernier contact,
                sauf obligation légale de conservation plus longue.
              </p>
            </section>

            {/* Destinataires */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                7. Destinataires des données
              </h2>
              <p className="text-light-300">
                Vos données sont destinées uniquement au personnel habilité de {contact.company}.
                Elles ne sont pas transmises à des tiers, sauf obligation légale ou sous-traitants
                techniques (hébergement, outils d&apos;analyse) soumis aux mêmes obligations de confidentialité.
              </p>
            </section>

            {/* Vos droits */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                8. Vos droits
              </h2>
              <p className="text-light-300 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-light-300 space-y-2">
                <li><strong className="text-light-100">Droit d&apos;accès :</strong> obtenir la confirmation du traitement et accéder à vos données</li>
                <li><strong className="text-light-100">Droit de rectification :</strong> demander la correction de données inexactes</li>
                <li><strong className="text-light-100">Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                <li><strong className="text-light-100">Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong className="text-light-100">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong className="text-light-100">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p className="text-light-300 mt-4">
                Pour exercer ces droits, contactez-nous à : <a href={contact.emailLink} className="text-accent-blue hover:underline select-all">{contact.email}</a>
              </p>
            </section>

            {/* Cookies */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                9. Cookies
              </h2>
              <p className="text-light-300 mb-4">
                Notre site utilise des cookies pour :
              </p>
              <ul className="list-disc list-inside text-light-300 space-y-2">
                <li><strong className="text-light-100">Cookies techniques :</strong> nécessaires au fonctionnement du site</li>
                <li><strong className="text-light-100">Cookies analytiques :</strong> mesure d&apos;audience et statistiques</li>
              </ul>
              <p className="text-light-300 mt-4">
                Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti de leur dépôt.
              </p>
            </section>

            {/* Sécurité */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                10. Sécurité
              </h2>
              <p className="text-light-300">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger
                vos données contre tout accès, modification, divulgation ou destruction non autorisé.
                Notre site utilise le protocole HTTPS pour sécuriser les échanges de données.
              </p>
            </section>

            {/* Réclamation */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                11. Réclamation
              </h2>
              <p className="text-light-300">
                Si vous estimez que le traitement de vos données ne respecte pas la réglementation,
                vous avez le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale
                de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">www.cnil.fr</a>
              </p>
            </section>

            {/* Modifications */}
            <section className="bg-dark-800/50 rounded-2xl p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold text-light-100 mb-4">
                12. Modifications
              </h2>
              <p className="text-light-300">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                Les modifications seront publiées sur cette page avec la date de mise à jour.
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
