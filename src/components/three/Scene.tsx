'use client';

import { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';

interface SceneProps {
  children: ReactNode;
  className?: string;
}

export default function Scene({ children, className = '' }: SceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
