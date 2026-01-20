'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleLogoProps {
  text?: string;
  particleCount?: number;
  formed?: boolean;
}

export default function ParticleLogo({
  text = 'SOCIAL SOFT',
  particleCount = 2000,
  formed = true,
}: ParticleLogoProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const [targetPositions, setTargetPositions] = useState<Float32Array | null>(null);

  // Positions initiales (dispersées)
  const { initialPositions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color('#3B82F6');
    const color2 = new THREE.Color('#06B6D4');

    for (let i = 0; i < particleCount; i++) {
      // Position dispersée dans une sphère
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Couleur interpolée
      const mixFactor = Math.random();
      const color = color1.clone().lerp(color2, mixFactor);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { initialPositions: positions, colors };
  }, [particleCount]);

  // Générer les positions cibles (forme du texte)
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 512;
    canvas.height = 128;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const positions = new Float32Array(particleCount * 3);
    const validPositions: { x: number; y: number }[] = [];

    // Trouver tous les pixels blancs (texte)
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        if (imageData.data[i] > 128) {
          validPositions.push({ x, y });
        }
      }
    }

    // Assigner des positions aux particules
    for (let i = 0; i < particleCount; i++) {
      if (validPositions.length > 0) {
        const pos = validPositions[Math.floor(Math.random() * validPositions.length)];
        positions[i * 3] = (pos.x / canvas.width - 0.5) * 4;
        positions[i * 3 + 1] = -(pos.y / canvas.height - 0.5) * 1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      } else {
        positions[i * 3] = (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
      }
    }

    setTargetPositions(positions);
  }, [text, particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || !targetPositions) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      if (formed) {
        // Interpoler vers la position cible
        positions[i3] += (targetPositions[i3] - positions[i3]) * 0.02;
        positions[i3 + 1] += (targetPositions[i3 + 1] - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (targetPositions[i3 + 2] - positions[i3 + 2]) * 0.02;

        // Légère oscillation
        positions[i3 + 2] += Math.sin(time * 2 + i * 0.1) * 0.001;
      } else {
        // Interpoler vers la position dispersée
        positions[i3] += (initialPositions[i3] - positions[i3]) * 0.02;
        positions[i3 + 1] += (initialPositions[i3 + 1] - positions[i3 + 1]) * 0.02;
        positions[i3 + 2] += (initialPositions[i3 + 2] - positions[i3 + 2]) * 0.02;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotation subtile
    pointsRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
  });

  // Créer la géométrie avec les attributs
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(initialPositions.slice(), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [initialPositions, colors]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
