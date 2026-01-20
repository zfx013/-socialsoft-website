'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSphereProps {
  particleCount?: number;
  radius?: number;
  mousePosition?: { x: number; y: number };
  morphSpeed?: number;
  color1?: string;
  color2?: string;
}

export default function ParticleSphere({
  particleCount = 5000,
  radius = 2,
  mousePosition = { x: 0, y: 0 },
  morphSpeed = 1,
  color1 = '#06b6d4',
  color2 = '#3b82f6',
}: ParticleSphereProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const originalPositions = useRef<Float32Array | undefined>(undefined);
  const targetPositions = useRef<Float32Array | undefined>(undefined);
  const morphProgress = useRef(0);
  const currentShape = useRef(0);

  // Generate particles
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const color1Vec = new THREE.Color(color1);
    const color2Vec = new THREE.Color(color2);

    // Initial sphere shape
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Fibonacci sphere distribution for even coverage
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Color based on position
      const t = (positions[i3 + 1] + radius) / (radius * 2);
      const color = color1Vec.clone().lerp(color2Vec, t);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Varying sizes
      sizes[i] = 0.02 + Math.random() * 0.03;
    }

    originalPositions.current = positions.slice();
    targetPositions.current = positions.slice();

    return { positions, colors, sizes };
  }, [particleCount, radius, color1, color2]);

  // Generate different target shapes
  const generateShape = (shapeIndex: number) => {
    const target = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      switch (shapeIndex % 4) {
        case 0: // Sphere
          target[i3] = radius * Math.sin(phi) * Math.cos(theta);
          target[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          target[i3 + 2] = radius * Math.cos(phi);
          break;

        case 1: // Torus
          const torusRadius = radius * 0.7;
          const tubeRadius = radius * 0.3;
          const u = (i / particleCount) * Math.PI * 2;
          const v = theta;
          target[i3] = (torusRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
          target[i3 + 1] = (torusRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
          target[i3 + 2] = tubeRadius * Math.sin(v);
          break;

        case 2: // Cube
          const size = radius * 1.2;
          const face = Math.floor(Math.random() * 6);
          const u2 = (Math.random() - 0.5) * size;
          const v2 = (Math.random() - 0.5) * size;
          switch (face) {
            case 0: target[i3] = size / 2; target[i3 + 1] = u2; target[i3 + 2] = v2; break;
            case 1: target[i3] = -size / 2; target[i3 + 1] = u2; target[i3 + 2] = v2; break;
            case 2: target[i3] = u2; target[i3 + 1] = size / 2; target[i3 + 2] = v2; break;
            case 3: target[i3] = u2; target[i3 + 1] = -size / 2; target[i3 + 2] = v2; break;
            case 4: target[i3] = u2; target[i3 + 1] = v2; target[i3 + 2] = size / 2; break;
            case 5: target[i3] = u2; target[i3 + 1] = v2; target[i3 + 2] = -size / 2; break;
          }
          break;

        case 3: // DNA Helix
          const helixHeight = radius * 2;
          const helixRadius = radius * 0.5;
          const helixT = (i / particleCount) * 4 * Math.PI;
          const helixY = (i / particleCount - 0.5) * helixHeight;
          const strand = i % 2 === 0 ? 0 : Math.PI;
          target[i3] = Math.cos(helixT + strand) * helixRadius;
          target[i3 + 1] = helixY;
          target[i3 + 2] = Math.sin(helixT + strand) * helixRadius;
          break;
      }
    }

    return target;
  };

  // Animation
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    // Morph between shapes every 5 seconds
    morphProgress.current += delta * morphSpeed * 0.2;

    if (morphProgress.current >= 1) {
      morphProgress.current = 0;
      originalPositions.current = targetPositions.current!.slice();
      currentShape.current++;
      targetPositions.current = generateShape(currentShape.current);
    }

    // Smooth interpolation
    const t = morphProgress.current;
    const smoothT = t * t * (3 - 2 * t); // Smoothstep

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Lerp between shapes
      const baseX = THREE.MathUtils.lerp(
        originalPositions.current![i3],
        targetPositions.current![i3],
        smoothT
      );
      const baseY = THREE.MathUtils.lerp(
        originalPositions.current![i3 + 1],
        targetPositions.current![i3 + 1],
        smoothT
      );
      const baseZ = THREE.MathUtils.lerp(
        originalPositions.current![i3 + 2],
        targetPositions.current![i3 + 2],
        smoothT
      );

      // Add wave animation
      const waveOffset = Math.sin(time * 2 + i * 0.01) * 0.05;

      // Mouse interaction - particles repel from mouse position
      const mouseInfluence = 0.5;
      const dx = mousePosition.x * 3 - baseX;
      const dy = mousePosition.y * 3 - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repelStrength = Math.max(0, 1 - dist / 2) * mouseInfluence;

      positions[i3] = baseX - dx * repelStrength + waveOffset;
      positions[i3 + 1] = baseY - dy * repelStrength;
      positions[i3 + 2] = baseZ + Math.sin(time + i * 0.02) * 0.03;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the whole sphere
    pointsRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group>
      {/* Main particles */}
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
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.3, 32, 32]} />
        <meshBasicMaterial
          color={color1}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.5, 32, 32]} />
        <meshBasicMaterial
          color={color2}
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
