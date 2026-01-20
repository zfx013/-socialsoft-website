'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface NeuralNetworkProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  particleColor?: string;
  lineColor?: string;
  speed?: number;
}

export default function NeuralNetwork({
  className = '',
  particleCount = 50,
  connectionDistance = 150,
  mouseRadius = 200,
  particleColor = 'rgba(6, 182, 212, 0.8)',
  lineColor = 'rgba(6, 182, 212, 0.15)',
  speed = 0.5,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + 1,
      });
    }
    particlesRef.current = particles;
  }, [particleCount, speed]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse interaction - particles are attracted to mouse
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseRadius && distance > 0) {
        const force = (mouseRadius - distance) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle) * force * 0.02;
        particle.vy += Math.sin(angle) * force * 0.02;
      }

      // Apply velocity with damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Draw particle with glow
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();

      // Add glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const cdx = particle.x - other.x;
        const cdy = particle.y - other.y;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

        if (cdist < connectionDistance) {
          const opacity = (1 - cdist / connectionDistance) * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = lineColor.replace('0.15', String(opacity * 0.3));
          ctx.lineWidth = opacity * 1.5;
          ctx.stroke();
        }
      }

      // Draw connection to mouse if close
      if (distance < mouseRadius) {
        const opacity = (1 - distance / mouseRadius) * 0.8;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`;
        ctx.lineWidth = opacity * 2;
        ctx.stroke();
      }
    });

    // Draw mouse glow
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouseRadius * 0.3
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouseRadius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [connectionDistance, lineColor, mouseRadius, particleColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check for reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
