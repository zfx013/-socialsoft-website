'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { navigation } from '@/lib/constants';
import MenuOverlay from './MenuOverlay';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;
    const rect = linkRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(linkRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!linkRef.current) return;
    gsap.to(linkRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
    setIsHovered(false);
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative text-light-200 hover:text-light-100 transition-colors duration-200 font-medium py-2"
    >
      {children}
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-cyan origin-left"
      />
    </Link>
  );
}

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

function NavDropdown({ label, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 text-light-200 hover:text-light-100 transition-colors duration-200 font-medium py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-64 py-2 bg-dark-800 border border-dark-600 rounded-xl shadow-xl"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 hover:bg-dark-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <span className="block text-light-100 font-medium">{item.name}</span>
                {item.description && (
                  <span className="block text-sm text-light-400 mt-0.5">{item.description}</span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50'
            : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/" className="relative z-10">
                <Image
                  src="/images/logo-white.svg"
                  alt="SOCIAL SOFT"
                  width={150}
                  height={40}
                  className="h-8 sm:h-10 w-auto"
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {item.dropdown && item.items ? (
                    <NavDropdown label={item.name} items={item.items} />
                  ) : (
                    <NavLink href={item.href}>{item.name}</NavLink>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden relative z-10 p-2 text-light-100 hover:text-accent-blue transition-colors"
              aria-label="Ouvrir le menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && <MenuOverlay onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
