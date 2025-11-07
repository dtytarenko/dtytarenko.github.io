import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ThreeBackground() {
  const particlesRef = useRef<THREE.Points>(null);
  const highlightedParticlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef(new THREE.Vector2(0, 0));
  const [fadeIn, setFadeIn] = useState(0);
  const connectedParticlesPositions = useRef<Float32Array>(new Float32Array(0));

  // Generate particles in a more structured way
  const particlesCount = 1500;

  const { positions, particles } = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const particles: THREE.Vector3[] = [];

    // Create particles with better distribution
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Spherical distribution with some clustering
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      particles.push(new THREE.Vector3(x, y, z));
    }

    return { positions, particles };
  }, []);

  // Handle mouse movement
  const handlePointerMove = (event: PointerEvent) => {
    mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  // Add mouse listener
  useMemo(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Animate with smooth rotation, wave effect, and mouse interaction
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Fade in effect
    if (fadeIn < 1) {
      setFadeIn(Math.min(1, fadeIn + 0.01));
    }

    if (particlesRef.current) {
      // Smooth rotation with mouse influence
      particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.2 + mousePosition.current.y * 0.3;
      particlesRef.current.rotation.y = time * 0.05 + mousePosition.current.x * 0.3;
    }

    // Animate highlighted particles with pulsing and rotation sync
    if (highlightedParticlesRef.current) {
      highlightedParticlesRef.current.rotation.x = particlesRef.current?.rotation.x || 0;
      highlightedParticlesRef.current.rotation.y = particlesRef.current?.rotation.y || 0;

      // Update opacity directly on material for pulsing effect
      const material = highlightedParticlesRef.current.material as THREE.PointsMaterial;
      if (material) {
        const pulseOpacity = 0.5 + Math.sin(time * 3) * 0.3; // Oscillates between 0.2 and 0.8
        material.opacity = pulseOpacity * fadeIn;
      }
    }

    // Update dynamic connections with smoother appearance
    if (linesRef.current) {
      const linePositions: number[] = [];
      const connectedIndices = new Set<number>(); // Track which particles have connections
      const maxDistance = 1.5; // Larger distance for smoother connections
      const maxConnections = 2; // Fewer connections per particle

      // Only show a subset of connections based on time (gradual appearance)
      const connectionProgress = Math.min(1, time * 0.15);

      for (let i = 0; i < particles.length; i++) {
        let connectionCount = 0;

        // Only process if we're in the gradual reveal range
        if (i / particles.length > connectionProgress) continue;

        // Only connect to particles that are further away in the array (creates more organic flow)
        for (let j = i + 50; j < particles.length && connectionCount < maxConnections; j++) {
          const distance = particles[i].distanceTo(particles[j]);

          // Only connect if distance is within range and not too close
          if (distance < maxDistance && distance > 0.5) {
            linePositions.push(
              particles[i].x, particles[i].y, particles[i].z,
              particles[j].x, particles[j].y, particles[j].z
            );
            connectedIndices.add(i);
            connectedIndices.add(j);
            connectionCount++;
          }
        }
      }

      // Create array of only connected particle positions
      const connectedPositions: number[] = [];
      connectedIndices.forEach(index => {
        connectedPositions.push(
          particles[index].x,
          particles[index].y,
          particles[index].z
        );
      });

      // Update connected particles ref
      connectedParticlesPositions.current = new Float32Array(connectedPositions);

      // Update geometry if positions changed
      if (highlightedParticlesRef.current && connectedPositions.length > 0) {
        const geo = highlightedParticlesRef.current.geometry as THREE.BufferGeometry;
        if (geo) {
          geo.setAttribute('position', new THREE.Float32BufferAttribute(connectedPositions, 3));
          geo.attributes.position.needsUpdate = true;
        }
      }

      // Update line geometry
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      if (linesRef.current.geometry) {
        linesRef.current.geometry.dispose();
      }
      linesRef.current.geometry = geometry;
    }
  });

  return (
    <group>
      {/* Connection Lines - Behind particles */}
      <lineSegments ref={linesRef} renderOrder={-1}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.08 * fadeIn}
          depthTest={false}
        />
      </lineSegments>

      {/* Regular Particles */}
      <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false} renderOrder={1}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7 * fadeIn}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Highlighted Connection Points - Only particles with connections, pulsing blue dots */}
      <Points ref={highlightedParticlesRef} positions={new Float32Array(0)} stride={3} frustumCulled={false} renderOrder={2}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8 * fadeIn}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default ThreeBackground;
