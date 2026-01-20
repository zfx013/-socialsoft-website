'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Configuration
const GLOBE_RADIUS = 1.5;
const IDF_CENTER = { lat: 48.8566, lng: 2.3522 }; // Paris/IDF

// Convertit lat/lng en position 3D sur la sphère
function latLngToPosition(lat: number, lng: number, radius: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

// Données simplifiées des continents (points principaux pour créer des formes)
const continentData = {
  europe: [
    { lat: 71, lng: 25 }, { lat: 70, lng: 30 }, { lat: 60, lng: 30 },
    { lat: 55, lng: 37 }, { lat: 50, lng: 40 }, { lat: 46, lng: 30 },
    { lat: 45, lng: 15 }, { lat: 36, lng: 28 }, { lat: 36, lng: -5 },
    { lat: 43, lng: -9 }, { lat: 48, lng: -5 }, { lat: 51, lng: 1 },
    { lat: 58, lng: 10 }, { lat: 63, lng: 10 }, { lat: 70, lng: 20 },
  ],
  africa: [
    { lat: 37, lng: 10 }, { lat: 32, lng: 30 }, { lat: 22, lng: 37 },
    { lat: 12, lng: 44 }, { lat: -12, lng: 50 }, { lat: -26, lng: 33 },
    { lat: -35, lng: 20 }, { lat: -34, lng: 18 }, { lat: -17, lng: 12 },
    { lat: 5, lng: 10 }, { lat: 5, lng: -5 }, { lat: 15, lng: -17 },
    { lat: 28, lng: -13 }, { lat: 35, lng: -5 },
  ],
  asia: [
    { lat: 77, lng: 100 }, { lat: 70, lng: 140 }, { lat: 65, lng: 170 },
    { lat: 55, lng: 160 }, { lat: 45, lng: 145 }, { lat: 35, lng: 140 },
    { lat: 30, lng: 120 }, { lat: 22, lng: 120 }, { lat: 8, lng: 105 },
    { lat: 1, lng: 104 }, { lat: 8, lng: 80 }, { lat: 23, lng: 70 },
    { lat: 25, lng: 65 }, { lat: 30, lng: 50 }, { lat: 42, lng: 55 },
    { lat: 50, lng: 55 }, { lat: 55, lng: 65 }, { lat: 70, lng: 70 },
  ],
  northAmerica: [
    { lat: 72, lng: -95 }, { lat: 70, lng: -140 }, { lat: 60, lng: -140 },
    { lat: 55, lng: -130 }, { lat: 48, lng: -125 }, { lat: 32, lng: -117 },
    { lat: 23, lng: -110 }, { lat: 18, lng: -95 }, { lat: 25, lng: -80 },
    { lat: 30, lng: -81 }, { lat: 45, lng: -67 }, { lat: 47, lng: -70 },
    { lat: 52, lng: -55 }, { lat: 60, lng: -65 }, { lat: 70, lng: -60 },
    { lat: 75, lng: -80 },
  ],
  southAmerica: [
    { lat: 12, lng: -72 }, { lat: 5, lng: -77 }, { lat: -5, lng: -81 },
    { lat: -15, lng: -75 }, { lat: -23, lng: -70 }, { lat: -40, lng: -73 },
    { lat: -55, lng: -68 }, { lat: -55, lng: -65 }, { lat: -40, lng: -62 },
    { lat: -35, lng: -57 }, { lat: -23, lng: -43 }, { lat: -5, lng: -35 },
    { lat: 5, lng: -52 }, { lat: 10, lng: -62 },
  ],
  australia: [
    { lat: -12, lng: 130 }, { lat: -15, lng: 140 }, { lat: -20, lng: 149 },
    { lat: -28, lng: 153 }, { lat: -38, lng: 145 }, { lat: -35, lng: 137 },
    { lat: -32, lng: 115 }, { lat: -22, lng: 114 }, { lat: -15, lng: 125 },
  ],
};

// Composant pour afficher un continent comme une ligne
function ContinentOutline({ points, color, opacity = 0.5 }: {
  points: { lat: number; lng: number }[];
  color: string;
  opacity?: number;
}) {
  const linePoints = useMemo(() => {
    const result: [number, number, number][] = [];
    points.forEach((p) => {
      result.push(latLngToPosition(p.lat, p.lng, GLOBE_RADIUS * 1.002));
    });
    // Fermer la boucle
    result.push(latLngToPosition(points[0].lat, points[0].lng, GLOBE_RADIUS * 1.002));
    return result;
  }, [points]);

  return (
    <Line
      points={linePoints}
      color={color}
      transparent
      opacity={opacity}
      lineWidth={1}
    />
  );
}

// Points représentant les terres (dots sur les continents)
function LandDots() {
  const dots = useMemo(() => {
    const allDots: [number, number, number][] = [];

    // Générer des points sur les continents
    Object.values(continentData).forEach(continent => {
      continent.forEach(point => {
        // Ajouter le point principal
        allDots.push(latLngToPosition(point.lat, point.lng, GLOBE_RADIUS * 1.001));

        // Ajouter quelques points autour pour "remplir"
        for (let i = 0; i < 3; i++) {
          const offsetLat = point.lat + (Math.random() - 0.5) * 8;
          const offsetLng = point.lng + (Math.random() - 0.5) * 8;
          allDots.push(latLngToPosition(offsetLat, offsetLng, GLOBE_RADIUS * 1.001));
        }
      });
    });

    return allDots;
  }, []);

  const geometry = useMemo(() => {
    const positions = new Float32Array(dots.length * 3);
    dots.forEach((dot, i) => {
      positions[i * 3] = dot[0];
      positions[i * 3 + 1] = dot[1];
      positions[i * 3 + 2] = dot[2];
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [dots]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.015}
        color="#4A90D9"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// Marqueur IDF avec label
function IdfMarker() {
  const markerRef = useRef<THREE.Group>(null);
  const position = useMemo(
    () => latLngToPosition(IDF_CENTER.lat, IDF_CENTER.lng, GLOBE_RADIUS * 1.02),
    []
  );

  useFrame((state) => {
    if (markerRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      markerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      {/* Anneau extérieur pulsant */}
      <group ref={markerRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Point central */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>

      {/* Glow interne */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.4} />
      </mesh>

      {/* Glow externe */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.15} />
      </mesh>

      {/* Ligne verticale indicateur */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.25, 8]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
      </mesh>

      {/* Point en haut de la ligne */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" />
      </mesh>
    </group>
  );
}

// Grille de longitude/latitude subtile
function GlobeGrid() {
  const gridLines = useMemo(() => {
    const lines: [number, number, number][][] = [];

    // Lignes de latitude
    [-60, -30, 0, 30, 60].forEach((lat) => {
      const points: [number, number, number][] = [];
      for (let lng = -180; lng <= 180; lng += 5) {
        points.push(latLngToPosition(lat, lng, GLOBE_RADIUS * 1.001));
      }
      lines.push(points);
    });

    // Lignes de longitude
    [-120, -60, 0, 60, 120].forEach((lng) => {
      const points: [number, number, number][] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        points.push(latLngToPosition(lat, lng, GLOBE_RADIUS * 1.001));
      }
      lines.push(points);
    });

    return lines;
  }, []);

  return (
    <group>
      {gridLines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#1E3A5F"
          transparent
          opacity={0.25}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

export default function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  // Rotation automatique lente
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Globe de base (océans) */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshBasicMaterial color="#0A1628" transparent opacity={0.95} />
      </Sphere>

      {/* Grille */}
      <GlobeGrid />

      {/* Contours des continents */}
      <ContinentOutline points={continentData.europe} color="#3B82F6" opacity={0.6} />
      <ContinentOutline points={continentData.africa} color="#3B82F6" opacity={0.5} />
      <ContinentOutline points={continentData.asia} color="#3B82F6" opacity={0.5} />
      <ContinentOutline points={continentData.northAmerica} color="#3B82F6" opacity={0.5} />
      <ContinentOutline points={continentData.southAmerica} color="#3B82F6" opacity={0.5} />
      <ContinentOutline points={continentData.australia} color="#3B82F6" opacity={0.5} />

      {/* Points sur les terres */}
      <LandDots />

      {/* Marqueur Île-de-France */}
      <IdfMarker />

      {/* Atmosphère subtile */}
      <Sphere args={[GLOBE_RADIUS * 1.03, 32, 32]}>
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}
