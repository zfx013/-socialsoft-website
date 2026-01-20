'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Circuit3DProps {
  width?: number;
  height?: number;
  gridSize?: number;
  signalSpeed?: number;
}

interface Signal {
  pathIndex: number;
  progress: number;
  speed: number;
  color: THREE.Color;
}

export default function Circuit3D({
  width = 10,
  height = 10,
  gridSize = 20,
  signalSpeed = 1,
}: Circuit3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const signalMeshRef = useRef<THREE.InstancedMesh>(null);
  const [signals, setSignals] = useState<Signal[]>([]);

  // Generate circuit paths
  const { paths, nodes, pathVertices } = useMemo(() => {
    const paths: THREE.Vector3[][] = [];
    const nodes: THREE.Vector3[] = [];
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    // Create grid nodes (connection points)
    for (let x = 0; x <= gridSize; x += 2) {
      for (let y = 0; y <= gridSize; y += 2) {
        if (Math.random() > 0.3) {
          nodes.push(new THREE.Vector3(
            (x - gridSize / 2) * cellWidth,
            (y - gridSize / 2) * cellHeight,
            0
          ));
        }
      }
    }

    // Create paths between nodes
    nodes.forEach((node, i) => {
      // Connect to nearby nodes
      nodes.forEach((otherNode, j) => {
        if (i >= j) return;

        const distance = node.distanceTo(otherNode);
        if (distance < cellWidth * 4 && Math.random() > 0.5) {
          // Create path with right angles (like PCB traces)
          const path: THREE.Vector3[] = [];
          path.push(node.clone());

          // Decide if we go horizontal first or vertical first
          if (Math.random() > 0.5) {
            path.push(new THREE.Vector3(otherNode.x, node.y, 0));
          } else {
            path.push(new THREE.Vector3(node.x, otherNode.y, 0));
          }

          path.push(otherNode.clone());
          paths.push(path);
        }
      });
    });

    // Create vertices for line rendering
    const pathVertices: number[] = [];
    paths.forEach(path => {
      for (let i = 0; i < path.length - 1; i++) {
        pathVertices.push(
          path[i].x, path[i].y, path[i].z,
          path[i + 1].x, path[i + 1].y, path[i + 1].z
        );
      }
    });

    return { paths, nodes, pathVertices };
  }, [width, height, gridSize]);

  // Initialize signals
  useMemo(() => {
    const initialSignals: Signal[] = [];
    const signalCount = Math.min(50, paths.length);

    for (let i = 0; i < signalCount; i++) {
      initialSignals.push({
        pathIndex: Math.floor(Math.random() * paths.length),
        progress: Math.random(),
        speed: 0.3 + Math.random() * 0.7,
        color: new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 1, 0.5),
      });
    }

    setSignals(initialSignals);
  }, [paths.length]);

  // Animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle rotation
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;

    // Update signals
    setSignals(prevSignals =>
      prevSignals.map(signal => {
        let newProgress = signal.progress + delta * signal.speed * signalSpeed;

        if (newProgress > 1) {
          // Move to a new random path
          return {
            ...signal,
            pathIndex: Math.floor(Math.random() * paths.length),
            progress: 0,
            speed: 0.3 + Math.random() * 0.7,
          };
        }

        return { ...signal, progress: newProgress };
      })
    );

    // Update signal mesh positions
    if (signalMeshRef.current) {
      const dummy = new THREE.Object3D();

      signals.forEach((signal, i) => {
        const path = paths[signal.pathIndex];
        if (!path || path.length < 2) return;

        // Calculate position along path
        const totalLength = path.length - 1;
        const segmentIndex = Math.floor(signal.progress * totalLength);
        const segmentProgress = (signal.progress * totalLength) % 1;

        const start = path[Math.min(segmentIndex, path.length - 1)];
        const end = path[Math.min(segmentIndex + 1, path.length - 1)];

        const position = start.clone().lerp(end, segmentProgress);

        dummy.position.copy(position);
        dummy.position.z = 0.1; // Slightly above the board
        dummy.scale.setScalar(0.15);
        dummy.updateMatrix();

        signalMeshRef.current!.setMatrixAt(i, dummy.matrix);
        signalMeshRef.current!.setColorAt(i, signal.color);
      });

      signalMeshRef.current.instanceMatrix.needsUpdate = true;
      if (signalMeshRef.current.instanceColor) {
        signalMeshRef.current.instanceColor.needsUpdate = true;
      }
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pathVertices, 3));
    return geometry;
  }, [pathVertices]);

  return (
    <group ref={groupRef}>
      {/* PCB Base */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[width * 1.2, height * 1.2]} />
        <meshBasicMaterial
          color="#0a1628"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Circuit traces */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#1e3a5f"
          transparent
          opacity={0.6}
        />
      </lineSegments>

      {/* Glowing traces overlay */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Connection nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={[node.x, node.y, 0]}>
          {/* Node base */}
          <mesh>
            <circleGeometry args={[0.12, 16]} />
            <meshBasicMaterial color="#1e3a5f" />
          </mesh>
          {/* Node glow */}
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial
              color="#06b6d4"
              transparent
              opacity={0.8}
            />
          </mesh>
          {/* Node outer glow */}
          <mesh position={[0, 0, 0.02]}>
            <circleGeometry args={[0.2, 16]} />
            <meshBasicMaterial
              color="#06b6d4"
              transparent
              opacity={0.1}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Animated signals */}
      <instancedMesh
        ref={signalMeshRef}
        args={[undefined, undefined, signals.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>

      {/* Central processor chip */}
      <group position={[0, 0, 0.05]}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 0.2]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        {/* Chip glow */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[1.3, 1.3]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.3}
          />
        </mesh>
        {/* Chip pins */}
        {[-0.5, -0.25, 0, 0.25, 0.5].map((offset, i) => (
          <group key={i}>
            <mesh position={[offset, 0.85, 0]}>
              <boxGeometry args={[0.08, 0.2, 0.05]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
            <mesh position={[offset, -0.85, 0]}>
              <boxGeometry args={[0.08, 0.2, 0.05]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
            <mesh position={[0.85, offset, 0]}>
              <boxGeometry args={[0.2, 0.08, 0.05]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
            <mesh position={[-0.85, offset, 0]}>
              <boxGeometry args={[0.2, 0.08, 0.05]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
