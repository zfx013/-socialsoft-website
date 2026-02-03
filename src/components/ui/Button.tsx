'use client';

import { forwardRef, useRef, useState, useCallback, ReactNode } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  magnetic?: boolean;
  onClickTrack?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', href, magnetic = true, onClickTrack, ...props }, ref) => {
    const magneticRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);
    const rafRef = useRef<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const baseStyles =
      'group relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 overflow-hidden';

    const variants = {
      primary:
        'bg-gradient-to-r from-accent-blue to-accent-cyan text-white shadow-lg shadow-accent-blue/25 hover:shadow-xl hover:shadow-accent-blue/40',
      secondary:
        'bg-dark-700/80 text-light-100 border border-dark-500 hover:border-accent-blue/50 hover:bg-dark-600/80 backdrop-blur-sm',
      outline:
        'bg-transparent text-light-100 border-2 border-accent-blue/50 hover:border-accent-blue hover:bg-accent-blue/10',
    };

    const sizes = {
      sm: 'px-5 py-2.5 text-sm',
      md: 'px-7 py-3.5 text-base',
      lg: 'px-9 py-4.5 text-lg',
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!magnetic || !magneticRef.current || !contentRef.current) return;

      // Throttle with requestAnimationFrame
      if (rafRef.current) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!magneticRef.current || !contentRef.current) return;

        const rect = magneticRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (clientX - centerX) * 0.25;
        const deltaY = (clientY - centerY) * 0.25;

        gsap.to(magneticRef.current, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: 'power2.out',
        });

        gsap.to(contentRef.current, {
          x: deltaX * 0.3,
          y: deltaY * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }, [magnetic]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (!magnetic || !magneticRef.current || !contentRef.current) return;

      gsap.to(magneticRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    }, [magnetic]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!magneticRef.current) return;

      const rect = magneticRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);

      // Call tracking function if provided
      if (onClickTrack) {
        onClickTrack();
      }
    };

    const buttonContent = (
      <>
        {/* Glow effect on hover */}
        <motion.span
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: variant === 'primary'
              ? 'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isHovered ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect on hover */}
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </span>

        {/* Ripple effects */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 pointer-events-none"
              style={{ left: ripple.x, top: ripple.y }}
              initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
              animate={{ width: 200, height: 200, x: -100, y: -100, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>

        {/* Pulsing border for primary */}
        {variant === 'primary' && isHovered && (
          <motion.span
            className="absolute inset-0 rounded-xl border-2 border-accent-cyan/50 pointer-events-none"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        <span ref={contentRef} className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </>
    );

    if (href) {
      return (
        <div
          ref={magneticRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="inline-block"
        >
          <motion.a
            href={href}
            className={combinedClassName}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonContent}
          </motion.a>
        </div>
      );
    }

    return (
      <div
        ref={magneticRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="inline-block"
      >
        <motion.button
          ref={ref}
          className={combinedClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          {buttonContent}
        </motion.button>
      </div>
    );
  }
);

Button.displayName = 'Button';

export default Button;
