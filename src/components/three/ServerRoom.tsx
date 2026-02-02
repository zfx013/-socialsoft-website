'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ServerRoomProps {
  rackCount?: number;
}

// Couleurs pour les LEDs
const LED_COLORS = {
  green: new THREE.Color('#22c55e'),
  blue: new THREE.Color('#3b82f6'),
  cyan: new THREE.Color('#06b6d4'),
  amber: new THREE.Color('#f59e0b'),
};

// Composant pour un serveur individuel (1U)
function ServerUnit({ position, ledPattern }: { position: [number, number, number]; ledPattern: number[] }) {
  const ledsRef = useRef<THREE.Mesh[]>([]);

  return (
    <group position={position}>
      {/* Boîtier du serveur */}
      <mesh>
        <boxGeometry args={[1.8, 0.18, 0.9]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Face avant avec ventilation */}
      <mesh position={[0, 0, 0.451]}>
        <boxGeometry args={[1.75, 0.15, 0.01]} />
        <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* LEDs */}
      {ledPattern.map((colorIndex, i) => {
        const colors = [LED_COLORS.green, LED_COLORS.blue, LED_COLORS.cyan, LED_COLORS.amber];
        return (
          <mesh
            key={i}
            ref={(el) => { if (el) ledsRef.current[i] = el; }}
            position={[-0.7 + i * 0.15, 0, 0.46]}
          >
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial
              color={colors[colorIndex % colors.length]}
              emissive={colors[colorIndex % colors.length]}
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        );
      })}

      {/* Grille de ventilation */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0.3 + i * 0.12, 0, 0.46]}>
          <boxGeometry args={[0.08, 0.1, 0.01]} />
          <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Composant pour un rack serveur complet
function ServerRack({ position, serverCount = 8 }: { position: [number, number, number]; serverCount?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Générer des patterns de LED aléatoires mais stables
  const ledPatterns = useMemo(() => {
    return Array.from({ length: serverCount }).map(() =>
      Array.from({ length: 4 }).map(() => Math.floor(Math.random() * 4))
    );
  }, [serverCount]);

  return (
    <group ref={groupRef} position={position}>
      {/* Cadre du rack */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 4, 1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Montants latéraux */}
      <mesh position={[-0.95, 0, 0.4]}>
        <boxGeometry args={[0.08, 3.9, 0.15]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.95, 0, 0.4]}>
        <boxGeometry args={[0.08, 3.9, 0.15]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Serveurs */}
      {Array.from({ length: serverCount }).map((_, i) => (
        <ServerUnit
          key={i}
          position={[0, -1.6 + i * 0.4, 0.1]}
          ledPattern={ledPatterns[i]}
        />
      ))}

      {/* Effet de lueur en bas (reflet) */}
      <mesh position={[0, -2.1, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export default function ServerRoom({ rackCount = 3 }: ServerRoomProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ledsRef = useRef<THREE.Mesh[]>([]);

  // Animation des LEDs
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Rotation lente du groupe
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1 - 0.3;
    }

    // Faire clignoter les LEDs de manière réaliste
    // On parcourt tous les enfants pour trouver les LEDs
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
          const material = child.material as THREE.MeshStandardMaterial;
          if (material.emissive) {
            // Clignotement basé sur la position et le temps
            const flickerSpeed = 2 + (child.position.x + child.position.y) * 0.5;
            const flicker = Math.sin(time * flickerSpeed + child.id) * 0.5 + 0.5;
            material.emissiveIntensity = 0.8 + flicker * 1.2;
          }
        }
      });
    }
  });

  // Positions des racks
  const rackPositions: [number, number, number][] = useMemo(() => {
    if (rackCount === 1) return [[0, 0, 0]];
    if (rackCount === 2) return [[-1.3, 0, 0], [1.3, 0, 0]];
    if (rackCount === 3) return [[-2.6, 0, 0.3], [0, 0, -0.3], [2.6, 0, 0.3]];
    return [[-3.9, 0, 0.4], [-1.3, 0, -0.2], [1.3, 0, -0.2], [3.9, 0, 0.4]];
  }, [rackCount]);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.2, -0.3, 0]}>
      {/* Racks serveur */}
      {rackPositions.map((pos, i) => (
        <ServerRack key={i} position={pos} serverCount={8} />
      ))}

      {/* Sol réfléchissant */}
      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial
          color="#0a0f1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Grille au sol */}
      <gridHelper
        args={[10, 20, '#1e3a5f', '#0d2847']}
        position={[0, -2.19, 0]}
      />

      {/* Éclairage datacenter */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#e0f2fe" />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} color="#bfdbfe" />

      {/* Lumières bleues de datacenter */}
      <pointLight position={[0, 3, 2]} intensity={0.8} color="#3b82f6" distance={8} />
      <pointLight position={[-3, 1, 1]} intensity={0.4} color="#06b6d4" distance={5} />
      <pointLight position={[3, 1, 1]} intensity={0.4} color="#06b6d4" distance={5} />

      {/* Reflet de lumière au plafond */}
      <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1e40af"
          emissiveIntensity={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
