import { useRef, useMemo, Suspense, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Clone } from '@react-three/drei';
import * as THREE from 'three';

// Black hole component using 3D model
function BlackHoleModel({ side = 'left' }: { side?: 'left' | 'right' }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  // Load the GLB model (shared between instances)
  const gltf = useGLTF('/models/blackhole.glb');

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Base rotation
      groupRef.current.rotation.y = time * 0.15;

      // Interactive mouse movement
      const mouseX = state.mouse.x * viewport.width / 2;
      const mouseY = state.mouse.y * viewport.height / 2;

      // Position based on side
      const baseX = side === 'left'
        ? -viewport.width / 2 - 6
        : viewport.width / 2 + 6;

      // Smooth follow mouse position
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        baseX + mouseX * 0.02,
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        mouseY * 0.2,
        0.05
      );

      // Tilt based on mouse position
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.PI / 2 + mouseY * 0.1,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        mouseX * 0.1,
        0.05
      );

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
      position={[0, 0, -15]}
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

// Procedural black hole fallback
function ProceduralBlackHole({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const diskRef = useRef<THREE.Mesh>(null);

  const blackHoleShader = useMemo(() => ({
    vertexShader: `
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vPosition = position;
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vNormal;

      // Noise function
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
        vec2 center = vec2(0.5, 0.5);
        float dist = length(vUv - center);

        // Event horizon - pure black center
        if (dist < 0.12) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        // Photon sphere - intense gravitational lensing
        if (dist < 0.18) {
          float intensity = smoothstep(0.12, 0.18, dist);
          float glow = pow(1.0 - intensity, 3.0);
          vec3 color = mix(
            vec3(1.0, 0.5, 0.0), // Orange
            vec3(0.0, 0.0, 0.0), // Black
            intensity
          );
          gl_FragColor = vec4(color + vec3(glow * 0.5), 1.0);
          return;
        }

        // Shadow region with subtle detail
        if (dist < 0.28) {
          float shadow = smoothstep(0.18, 0.28, dist);
          float noise = random(vUv + time * 0.01) * 0.05;
          vec3 color = vec3(0.05, 0.02, 0.0) + noise;
          gl_FragColor = vec4(color, 1.0 - shadow * 0.7);
          return;
        }

        discard;
      }
    `,
    uniforms: {
      time: { value: 0 }
    }
  }), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (diskRef.current) {
      diskRef.current.rotation.z = time * 0.4;
    }
    blackHoleShader.uniforms.time.value = time;
  });

  return (
    <group ref={groupRef} position={[-12, 0, -8]}>
      {/* Black hole sphere */}
      <mesh>
        <sphereGeometry args={[2.2, 128, 128]} />
        <shaderMaterial
          vertexShader={blackHoleShader.vertexShader}
          fragmentShader={blackHoleShader.fragmentShader}
          uniforms={blackHoleShader.uniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Accretion disk - multiple layers */}
      <mesh ref={diskRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[2.5, 6, 128]} />
        <meshBasicMaterial
          color="#ff4400"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.5, 0, Math.PI / 4]}>
        <ringGeometry args={[2.3, 3.5, 128]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.5, 0, Math.PI / 2]}>
        <ringGeometry args={[5, 7, 128]} />
        <meshBasicMaterial
          color="#ff2200"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point lights for glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#ff6600" distance={10} />
      <pointLight position={[3, 0, 0]} intensity={0.5} color="#ff4400" distance={8} />
      <pointLight position={[-3, 0, 0]} intensity={0.5} color="#ff4400" distance={8} />
    </group>
  );
}

function FluidGradient() {
  const starsRef = useRef<THREE.Points>(null);

  // Create starfield
  const starsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    for (let i = 0; i < 5000; i++) {
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

        {/* Black holes - left and right */}
        <Suspense fallback={null}>
          <BlackHoleModel side="left" />
          <BlackHoleModel side="right" />
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
