'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataTunnelProps {
  speed?: number;
  particleCount?: number;
  radius?: number;
  length?: number;
  color1?: string;
  color2?: string;
}

export default function DataTunnel({
  speed = 1,
  particleCount = 2000,
  radius = 3,
  length = 50,
  color1 = '#06b6d4',
  color2 = '#3b82f6',
}: DataTunnelProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate tunnel particles
  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const color1Vec = new THREE.Color(color1);
    const color2Vec = new THREE.Color(color2);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position along the tunnel (z-axis)
      const z = (Math.random() - 0.5) * length;

      // Angle around the tunnel
      const angle = Math.random() * Math.PI * 2;

      // Radius with some variation
      const r = radius + (Math.random() - 0.5) * 0.5;

      positions[i3] = Math.cos(angle) * r;
      positions[i3 + 1] = Math.sin(angle) * r;
      positions[i3 + 2] = z;

      // Color gradient based on position
      const t = (z + length / 2) / length;
      const color = color1Vec.clone().lerp(color2Vec, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Random speed for each particle
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    return { positions, colors, speeds };
  }, [particleCount, radius, length, color1, color2]);

  // Generate tunnel rings/lines
  const ringGeometry = useMemo(() => {
    const vertices: number[] = [];
    const ringColors: number[] = [];
    const ringCount = 20;
    const segmentsPerRing = 32;

    const color1Vec = new THREE.Color(color1);
    const color2Vec = new THREE.Color(color2);

    for (let ring = 0; ring < ringCount; ring++) {
      const z = (ring / ringCount - 0.5) * length;
      const t = ring / ringCount;
      const color = color1Vec.clone().lerp(color2Vec, t);

      for (let seg = 0; seg < segmentsPerRing; seg++) {
        const angle1 = (seg / segmentsPerRing) * Math.PI * 2;
        const angle2 = ((seg + 1) / segmentsPerRing) * Math.PI * 2;

        vertices.push(
          Math.cos(angle1) * radius, Math.sin(angle1) * radius, z,
          Math.cos(angle2) * radius, Math.sin(angle2) * radius, z
        );

        ringColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(ringColors, 3));
    return geometry;
  }, [radius, length, color1, color2]);

  // Animation
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Move particles towards camera
      positions[i3 + 2] += speeds[i] * speed * delta * 10;

      // Reset particles that pass the camera
      if (positions[i3 + 2] > length / 2) {
        positions[i3 + 2] = -length / 2;

        // Randomize position on reset
        const angle = Math.random() * Math.PI * 2;
        const r = radius + (Math.random() - 0.5) * 0.5;
        positions[i3] = Math.cos(angle) * r;
        positions[i3 + 1] = Math.sin(angle) * r;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the rings slightly
    if (linesRef.current) {
      linesRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, 0]} position={[0, 0, -10]}>
      {/* Tunnel particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Tunnel rings */}
      <lineSegments ref={linesRef} geometry={ringGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Center glow */}
      <mesh position={[0, 0, length / 2]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial
          color={color1}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Composant wrapper avec effet de vitesse variable
export function WarpTunnel({ intensity = 1 }: { intensity?: number }) {
  return (
    <DataTunnel
      speed={intensity}
      particleCount={3000}
      radius={4}
      length={60}
    />
  );
}
