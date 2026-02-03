'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Bird {
  position: THREE.Vector3;
  basePosition: THREE.Vector3;
  velocity: THREE.Vector3;
  wingPhase: number;
  wingSpeed: number;
  scale: number;
  bodyColor: THREE.Color;
  wingColor: THREE.Color;
  bellyColor: THREE.Color;
}

interface HummingbirdsProps {
  count?: number;
  spread?: number;
  mousePosition?: { x: number; y: number };
  fleeRadius?: number;
  fleeStrength?: number;
  birdScale?: number;
  wanderStrength?: number;
}

// Créer une aile simple et plate
function createWingGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Forme d'aile allongée
  shape.moveTo(0, 0);
  shape.lineTo(0.5, 0.08);
  shape.lineTo(0.7, 0);
  shape.lineTo(0.5, -0.05);
  shape.lineTo(0, 0);

  const geometry = new THREE.ShapeGeometry(shape);
  return geometry;
}

export default function Hummingbirds({
  count = 8,
  spread = 5,
  mousePosition = { x: 0, y: 0 },
  fleeRadius = 2.5,
  fleeStrength = 2,
  birdScale = 0.35,
  wanderStrength = 1,
}: HummingbirdsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const birdsRef = useRef<Bird[]>([]);

  // Géométrie d'aile partagée
  const wingGeometry = useMemo(() => createWingGeometry(), []);

  // Palette de couleurs pour colibris
  const colorPalettes = useMemo(() => [
    { body: '#059669', wing: '#34d399', belly: '#6ee7b7' }, // Vert émeraude
    { body: '#0891b2', wing: '#22d3ee', belly: '#67e8f9' }, // Cyan
    { body: '#7c3aed', wing: '#a78bfa', belly: '#c4b5fd' }, // Violet
    { body: '#0284c7', wing: '#38bdf8', belly: '#7dd3fc' }, // Bleu ciel
    { body: '#14b8a6', wing: '#2dd4bf', belly: '#5eead4' }, // Turquoise
  ], []);

  // Initialize birds - PLUS PETITS
  const birds = useMemo(() => {
    const newBirds: Bird[] = [];

    for (let i = 0; i < count; i++) {
      const basePos = new THREE.Vector3(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.5,
        (Math.random() - 0.5) * 2
      );

      const palette = colorPalettes[i % colorPalettes.length];

      newBirds.push({
        position: basePos.clone(),
        basePosition: basePos.clone(),
        velocity: new THREE.Vector3(0, 0, 0),
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 15 + Math.random() * 8,
        scale: birdScale + Math.random() * (birdScale * 0.3),
        bodyColor: new THREE.Color(palette.body),
        wingColor: new THREE.Color(palette.wing),
        bellyColor: new THREE.Color(palette.belly),
      });
    }

    birdsRef.current = newBirds;
    return newBirds;
  }, [count, spread, colorPalettes, birdScale]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const mouseWorld = new THREE.Vector3(
      mousePosition.x * 4,
      mousePosition.y * 3,
      0
    );

    birdsRef.current.forEach((bird, index) => {
      const toMouse = new THREE.Vector3().subVectors(bird.position, mouseWorld);
      const distToMouse = toMouse.length();

      // Fuite douce si la souris est proche
      if (distToMouse < fleeRadius) {
        const fleeForce = toMouse.normalize().multiplyScalar(
          (1 - distToMouse / fleeRadius) * fleeStrength * delta
        );
        bird.velocity.add(fleeForce);
      }

      // Retour plus lent vers la position de base (permet plus d'errance)
      const toBase = new THREE.Vector3().subVectors(bird.basePosition, bird.position);
      const returnForce = toBase.multiplyScalar(0.15 * delta);
      bird.velocity.add(returnForce);

      // Mouvement de vol dynamique - les oiseaux se baladent partout
      const hover = new THREE.Vector3(
        Math.sin(time * 1.2 + index * 3.7) * 0.15 + Math.cos(time * 0.7 + index * 5) * 0.12,
        Math.cos(time * 1.4 + index * 2.3) * 0.12 + Math.sin(time * 0.8 + index * 4) * 0.08,
        Math.sin(time * 0.6 + index * 4.2) * 0.06
      ).multiplyScalar(delta * wanderStrength);
      bird.velocity.add(hover);

      // Friction pour mouvement fluide
      bird.velocity.multiplyScalar(0.94);
      bird.position.add(bird.velocity);

      // Mettre à jour le groupe de l'oiseau
      const birdGroup = groupRef.current!.children[index] as THREE.Group;
      if (birdGroup) {
        birdGroup.position.copy(bird.position);

        // Orientation très douce - seulement si mouvement significatif
        const speed = bird.velocity.length();
        if (speed > 0.005) {
          const targetRotationY = Math.atan2(bird.velocity.x, bird.velocity.z);

          // Éviter les rotations brusques (différence d'angle limitée)
          let angleDiff = targetRotationY - birdGroup.rotation.y;
          // Normaliser l'angle entre -PI et PI
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

          // Rotation très lente et progressive
          birdGroup.rotation.y += angleDiff * 0.02;

          // Légère inclinaison selon la direction (très subtile)
          birdGroup.rotation.z = THREE.MathUtils.lerp(
            birdGroup.rotation.z,
            -bird.velocity.x * 0.3,
            0.02
          );
          birdGroup.rotation.x = THREE.MathUtils.lerp(
            birdGroup.rotation.x,
            bird.velocity.y * 0.2,
            0.02
          );
        }

        // Battement d'ailes rapide comme un colibri
        bird.wingPhase += delta * bird.wingSpeed;
        const wingAngle = Math.sin(bird.wingPhase) * 0.8;

        // Aile gauche (index 1) et droite (index 2) dans le groupe
        const leftWingGroup = birdGroup.children[1] as THREE.Group;
        const rightWingGroup = birdGroup.children[2] as THREE.Group;
        if (leftWingGroup && rightWingGroup) {
          // Rotation pour le battement - en forme de 8 comme les colibris
          leftWingGroup.rotation.z = wingAngle;
          leftWingGroup.rotation.y = Math.cos(bird.wingPhase) * 0.3;
          rightWingGroup.rotation.z = -wingAngle;
          rightWingGroup.rotation.y = -Math.cos(bird.wingPhase) * 0.3;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {birds.map((bird, index) => (
        <group key={index} position={bird.position} scale={bird.scale}>

          {/* Corps - octaèdre allongé horizontalement */}
          <mesh scale={[0.6, 0.4, 1]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial
              color={bird.bodyColor}
              flatShading
              roughness={0.4}
            />
          </mesh>

          {/* Aile gauche */}
          <group position={[0.15, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={wingGeometry}>
              <meshStandardMaterial
                color={bird.wingColor}
                flatShading
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Aile droite (miroir) */}
          <group position={[-0.15, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[-1, 1, 1]}>
            <mesh geometry={wingGeometry}>
              <meshStandardMaterial
                color={bird.wingColor}
                flatShading
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Tête - icosaèdre */}
          <mesh position={[0, 0.05, 0.35]}>
            <icosahedronGeometry args={[0.12, 0]} />
            <meshStandardMaterial
              color={bird.bodyColor}
              flatShading
              roughness={0.4}
            />
          </mesh>

          {/* Bec jaune - cône pointant vers l'avant */}
          <mesh position={[0, 0.03, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.02, 0.15, 4]} />
            <meshStandardMaterial color="#fbbf24" flatShading />
          </mesh>

          {/* Queue - cône aplati vers l'arrière */}
          <mesh position={[0, 0, -0.35]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 0.3]}>
            <coneGeometry args={[0.12, 0.3, 4]} />
            <meshStandardMaterial
              color={bird.bodyColor}
              flatShading
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Œil gauche */}
          <mesh position={[0.06, 0.1, 0.42]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color="#000000" />
          </mesh>

          {/* Œil droit */}
          <mesh position={[-0.06, 0.1, 0.42]}>
            <sphereGeometry args={[0.02, 6, 6]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      ))}

      {/* Éclairage */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
    </group>
  );
}
