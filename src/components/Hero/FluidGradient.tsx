import { useRef, useMemo, Suspense, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';

// Black hole component using 3D model
function BlackHoleModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load the GLB model
  const gltf = useGLTF('/models/blackhole.glb');

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = time * 0.2;

      // Subtle tilt animation
      groupRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.3) * 0.05;
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.03;

      // Scale on hover
      const targetScale = hovered ? 2.8 : 2.5;
      const currentScale = groupRef.current.scale.x;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(currentScale, targetScale, 0.1)
      );
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0, -12]}
      scale={2.5}
      rotation={[Math.PI / 2, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Clone object={gltf.scene} />
      {/* Main directional light */}
      <directionalLight position={[0, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[0, -10, 5]} intensity={1.5} color="#6699ff" />
      {/* Accent lights for glow - brighter on hover */}
      <pointLight position={[0, 0, 3]} intensity={hovered ? 6 : 4} color="#66ccff" />
      <pointLight position={[3, 3, 2]} intensity={hovered ? 3 : 2} color="#0099ff" />
      <pointLight position={[-3, -3, 2]} intensity={hovered ? 3 : 2} color="#0099ff" />
      {/* Back light for depth */}
      <pointLight position={[0, 0, -5]} intensity={hovered ? 3 : 2} color="#004466" />
    </group>
  );
}

function FluidGradient() {
  const starsRef = useRef<THREE.Points>(null);

  // Create starfield (optimized count for mobile)
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    // Reduce stars on mobile for performance
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 1500 : 3000;

    for (let i = 0; i < starCount; i++) {
      // Spherical distribution
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      vertices.push(x, y, z);

      // Varied star colors
      const colorChoice = Math.random();
      if (colorChoice > 0.8) {
        colors.push(0.6, 0.8, 1.0); // Blue giant
      } else if (colorChoice > 0.6) {
        colors.push(1.0, 0.8, 0.6); // Yellow star
      } else if (colorChoice > 0.4) {
        colors.push(1.0, 0.5, 0.3); // Orange star
      } else {
        colors.push(1.0, 1.0, 1.0); // White star
      }

      // Varied sizes
      sizes.push(Math.random() * 0.1 + 0.05);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    return geometry;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.005;
      starsRef.current.rotation.x = Math.sin(time * 0.002) * 0.1;
    }
  });

  return (
    <>
      {/* Fog for depth */}
      <fog attach="fog" args={['#000000', 10, 100]} />

      <group>
        {/* Starfield */}
        <points ref={starsRef} geometry={starsGeometry}>
          <pointsMaterial
            vertexColors
            transparent
            opacity={0.9}
            sizeAttenuation
            size={0.08}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Black hole - centered */}
        <Suspense fallback={null}>
          <BlackHoleModel />
        </Suspense>

        {/* Ambient lighting */}
        <ambientLight intensity={0.5} />
        {/* Hemisphere light for better 3D effect */}
        <hemisphereLight args={['#ffffff', '#000033', 0.6]} />
      </group>
    </>
  );
}

export default FluidGradient;
