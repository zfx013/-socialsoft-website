'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WaveGridProps {
  mousePosition?: { x: number; y: number };
}

export default function WaveGrid({ mousePosition = { x: 0, y: 0 } }: WaveGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#3B82F6') },
      uColorB: { value: new THREE.Color('#06B6D4') },
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;

      vec3 pos = position;

      // Vagues principales - plus fluides et lentes
      float slowTime = uTime * 0.4;
      float wave1 = sin(pos.x * 1.2 + slowTime) * 0.18;
      float wave2 = sin(pos.y * 1.0 + slowTime * 0.7) * 0.15;
      float wave3 = sin((pos.x + pos.y) * 0.8 + slowTime * 0.9) * 0.12;
      float wave4 = sin((pos.x - pos.y) * 0.6 + slowTime * 0.5) * 0.08;
      float wave5 = cos(pos.x * 0.5 + pos.y * 0.5 + slowTime * 0.3) * 0.06;

      // Effet souris (subtil et fluide)
      float mouseDistance = distance(pos.xy, uMouse * 2.0);
      float mouseWave = sin(mouseDistance * 2.0 - uTime * 1.5) * 0.08 * (1.0 / (mouseDistance + 1.5));

      pos.z = wave1 + wave2 + wave3 + wave4 + wave5 + mouseWave;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixStrength = (vElevation + 0.3) * 1.5;
      vec3 color = mix(uColorA, uColorB, mixStrength);

      // Grille
      float gridX = step(0.98, fract(vUv.x * 20.0));
      float gridY = step(0.98, fract(vUv.y * 20.0));
      float grid = max(gridX, gridY);

      // Mélanger couleur de fond et grille
      vec3 finalColor = mix(color * 0.1, color, grid * 0.5 + 0.3);

      gl_FragColor = vec4(finalColor, 0.6);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uMouse.value.set(mousePosition.x, mousePosition.y);
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[12, 12, 150, 150]} />
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
