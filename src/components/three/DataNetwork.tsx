'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

export default function DataNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Générer les nodes
  const { nodes, nodePositions } = useMemo(() => {
    const count = 50;
    const nodes: Node[] = [];
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
      nodes.push({ position, velocity });

      positions[i * 3] = position.x;
      positions[i * 3 + 1] = position.y;
      positions[i * 3 + 2] = position.z;
    }

    return { nodes, nodePositions: positions };
  }, []);

  // Générer les connexions
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const connectionDistance = 2.5;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < connectionDistance) {
          positions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Rotation lente du groupe
    groupRef.current.rotation.y += 0.001;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    // Animation des nodes
    nodes.forEach((node, i) => {
      node.position.add(node.velocity);

      // Rebondir sur les bords
      ['x', 'y', 'z'].forEach((axis) => {
        const a = axis as 'x' | 'y' | 'z';
        if (Math.abs(node.position[a]) > 4) {
          node.velocity[a] *= -1;
        }
      });
    });
  });

  return (
    <group ref={groupRef}>
      {/* Nodes (sphères) */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Connexions (lignes) */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#60A5FA" transparent opacity={0.3} />
      </lineSegments>

      {/* Quelques nodes plus gros comme "serveurs" */}
      {[0, 10, 25, 40].map((i) => (
        <mesh key={`server-${i}`} position={nodes[i].position}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}
