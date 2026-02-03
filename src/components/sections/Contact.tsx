'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Linkedin, ArrowRight, Send, CheckCircle, Loader2, LucideIcon } from 'lucide-react';
import { contact } from '@/lib/constants';
import { trackEvent, TrackingEvent } from '@/lib/tracking';
import Button from '@/components/ui/Button';
import GlowEffect from '@/components/effects/GlowEffect';
import SplitText from '@/components/effects/SplitText';
import DataStream from '@/components/effects/DataStream';
import SectionTransition from '@/components/effects/SectionTransition';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface InputFieldProps {
  label: string;
  name: keyof FormData;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  textarea?: boolean;
}

function InputField({ label, name, type = 'text', value, onChange, required, textarea }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const inputClasses = `
    w-full bg-dark-700/50 border rounded-xl px-4 py-4 text-light-100
    transition-all duration-300 outline-none
    ${isFocused || hasValue ? 'border-accent-blue' : 'border-dark-600 hover:border-dark-500'}
  `;

  return (
    <div className="relative">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? '#3B82F6' : '#9CA3AF',
        }}
        className="absolute left-4 top-4 origin-left pointer-events-none transition-all duration-200 text-light-200"
      >
        {label} {required && <span className="text-accent-blue">*</span>}
      </motion.label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          rows={4}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={inputClasses}
        />
      )}

      {/* Focus indicator line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan origin-left"
      />

      {/* Glow on focus */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await fetch('https://script.google.com/macros/s/AKfycby2klpY8gBsa2euIznYGGyfMCVLkGoBvFsXvCCnJ2Hd48CVHxJaHGyWgkIK5nt0HMyeUA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      setIsSubmitted(true);
      trackEvent('contact_form_submit');

      // Reset form after showing success
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-dark-800 overflow-hidden">
      {/* Data stream background */}
      <DataStream opacity={0.05} density={20} />

      {/* Background */}
      <GlowEffect className="top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" size="lg" />
      <GlowEffect className="bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2" color="cyan" size="md" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionTransition animation="scale">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium mb-6"
            >
              Contact
            </motion.span>
          </SectionTransition>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-light-100 mb-4">
            <SplitText animation="slide" type="words">
              Parlons de votre projet
            </SplitText>
          </h2>
          <SectionTransition animation="fade" delay={0.2}>
            <p className="text-lg text-light-200 max-w-2xl mx-auto">
              Prêt à démarrer ? Notre équipe est là pour vous accompagner.
            </p>
          </SectionTransition>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <SectionTransition animation="slide-right" className="lg:col-span-3">
            <div className="relative p-8 rounded-2xl bg-dark-900/50 border border-dark-700 backdrop-blur-sm overflow-hidden group">
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute inset-[-1px] rounded-2xl"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3))',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-[1px] rounded-2xl bg-dark-900/95" />
              </div>

              <div className="relative">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.1 }}
                        className="relative w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="w-10 h-10 text-green-500" />
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-green-500"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                      <h3 className="text-2xl font-semibold text-light-100 mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-light-200">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      ref={formRef}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                          label="Nom complet"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <InputField
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <InputField
                          label="Téléphone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        <InputField
                          label="Sujet"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <InputField
                        label="Votre message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        textarea
                      />

                      {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SectionTransition>

          {/* Contact info */}
          <SectionTransition animation="slide-left" delay={0.2} className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-light-100 mb-6">
              Ou contactez-nous directement
            </h3>

            <div className="space-y-4">
              <ContactCard
                href={contact.phoneLink}
                icon={Phone}
                label="Téléphone"
                value={contact.phoneFormatted}
                delay={0}
                trackingEvent="phone_click"
              />

              <ContactCard
                href={contact.emailLink}
                icon={Mail}
                label="Email"
                value={contact.email}
                delay={0.1}
                trackingEvent="email_click"
              />

              <ContactCard
                href={contact.mapsLink}
                icon={MapPin}
                label="Adresse"
                value={`${contact.address.street}\n${contact.address.postalCode} ${contact.address.city}`}
                external
                delay={0.2}
                multiline
                trackingEvent="address_click"
              />

              <ContactCard
                href={contact.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                value="Suivez-nous"
                external
                delay={0.3}
                trackingEvent="linkedin_click"
              />
            </div>
          </SectionTransition>
        </div>
      </div>
    </section>
  );
}

interface ContactCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  external?: boolean;
  delay?: number;
  multiline?: boolean;
  trackingEvent?: TrackingEvent;
}

function ContactCard({ href, icon: Icon, label, value, external, delay = 0, multiline, trackingEvent }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (trackingEvent) {
      trackEvent(trackingEvent);
    }
  };

  return (
    <motion.a
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: delay + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-4 p-4 rounded-xl bg-dark-700/50 border border-dark-600 hover:border-accent-blue/50 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Animated border on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl pointer-events-none"
          >
            <motion.div
              className="absolute inset-[-1px] rounded-xl"
              style={{
                background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), transparent, rgba(59, 130, 246, 0.3))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[1px] rounded-xl bg-dark-700/90" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue transition-colors duration-300">
        <Icon className="w-5 h-5 text-accent-blue group-hover:text-white transition-colors" />
        {/* Glow pulse on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-accent-blue/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 relative">
        <p className="text-light-200 text-sm mb-0.5">{label}</p>
        <p className={`text-light-100 font-semibold text-sm leading-relaxed ${multiline ? 'whitespace-pre-line' : ''}`}>{value}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-light-200 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 relative" />
    </motion.a>
  );
}
