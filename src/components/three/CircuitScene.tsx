'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Circuit3D from './Circuit3D';

interface CircuitSceneProps {
  className?: string;
}

export default function CircuitScene({ className = '' }: CircuitSceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Circuit3D
            width={12}
            height={12}
            gridSize={24}
            signalSpeed={1.5}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <ambientLight intensity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
