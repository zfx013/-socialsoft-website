'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroBackgroundProps {
  mousePosition?: { x: number; y: number };
}

// Vertex shader pour la grille avec vagues
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Vague principale
    float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.15;
    float wave2 = sin(pos.y * 1.5 + uTime * 0.3) * 0.1;
    float wave3 = cos((pos.x + pos.y) * 1.0 + uTime * 0.4) * 0.08;

    // Effet de souris
    float dist = distance(pos.xy, uMouse * 5.0);
    float mouseWave = exp(-dist * 0.3) * 0.3;

    float elevation = wave1 + wave2 + wave3 + mouseWave;
    pos.z = elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Fragment shader avec gradient
const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Couleur basée sur l'élévation
    vec3 colorLow = vec3(0.059, 0.094, 0.133); // dark-800
    vec3 colorMid = vec3(0.231, 0.510, 0.965); // accent-blue
    vec3 colorHigh = vec3(0.024, 0.714, 0.831); // accent-cyan

    float t = (vElevation + 0.3) / 0.6;
    vec3 color = mix(colorLow, colorMid, smoothstep(0.0, 0.5, t));
    color = mix(color, colorHigh, smoothstep(0.5, 1.0, t));

    // Grille subtile
    float gridX = smoothstep(0.02, 0.0, abs(fract(vUv.x * 20.0) - 0.5));
    float gridY = smoothstep(0.02, 0.0, abs(fract(vUv.y * 20.0) - 0.5));
    float grid = max(gridX, gridY) * 0.3;

    color += vec3(grid * 0.3, grid * 0.5, grid * 0.6);

    // Fade sur les bords
    float fadeX = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x);
    float fadeY = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
    float fade = fadeX * fadeY;

    gl_FragColor = vec4(color, fade * 0.7);
  }
`;

// Composant grille avec shader
function WaveGrid({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.set(
        mousePosition.x,
        mousePosition.y
      );
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1.5, 0]}>
      <planeGeometry args={[12, 12, 80, 80]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Particules flottantes
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Position initiale dans un espace large
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;

      // Vélocité pour mouvement subtil
      velocities.push({
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.001,
      });
    }

    return { positions, velocities };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (pointsRef.current) {
      const positionsAttr = pointsRef.current.geometry.attributes.position;
      const array = positionsAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        array[i * 3] += velocities[i].x;
        array[i * 3 + 1] += velocities[i].y;
        array[i * 3 + 2] += velocities[i].z;

        // Rebond aux limites
        if (Math.abs(array[i * 3]) > 5) velocities[i].x *= -1;
        if (Math.abs(array[i * 3 + 1]) > 3) velocities[i].y *= -1;
        if (Math.abs(array[i * 3 + 2]) > 2) velocities[i].z *= -1;
      }

      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#3B82F6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroBackground({ mousePosition = { x: 0, y: 0 } }: HeroBackgroundProps) {
  return (
    <group>
      {/* Grille principale avec vagues */}
      <WaveGrid mousePosition={mousePosition} />

      {/* Particules flottantes */}
      <FloatingParticles />

      {/* Lumière ambiante */}
      <ambientLight intensity={0.5} />
    </group>
  );
}
