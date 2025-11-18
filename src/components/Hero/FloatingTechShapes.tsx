import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingTechShapes() {
  const meshRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mousePosition = useRef(new THREE.Vector2(0, 0));

  // Create terrain geometry
  const geometry = useMemo(() => {
    const segments = 100;
    const size = 20;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    return geo;
  }, []);

  // Create lines geometry for wireframe effect
  const linesGeometry = useMemo(() => {
    const segments = 100;
    const size = 20;
    const lines: number[] = [];

    // Create vertical lines
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments - 0.5) * size;
      for (let j = 0; j <= segments; j++) {
        const y = (j / segments - 0.5) * size;
        const nextY = ((j + 1) / segments - 0.5) * size;

        if (j < segments) {
          lines.push(x, y, 0);
          lines.push(x, nextY, 0);
        }
      }
    }

    // Create horizontal lines
    for (let j = 0; j <= segments; j++) {
      const y = (j / segments - 0.5) * size;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * size;
        const nextX = ((i + 1) / segments - 0.5) * size;

        if (i < segments) {
          lines.push(x, y, 0);
          lines.push(nextX, y, 0);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
    return geo;
  }, []);

  // Handle mouse movement
  useMemo(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const array = positions.array as Float32Array;

      for (let i = 0; i < positions.count; i++) {
        const x = array[i * 3];
        const y = array[i * 3 + 1];

        // Create multiple wave effects
        const wave1 = Math.sin(x * 0.5 + time * 1.5) * 1.5;
        const wave2 = Math.sin(y * 0.3 + time * 1.0) * 1.0;
        const wave3 = Math.sin((x + y) * 0.2 + time * 0.8) * 0.8;

        // Combine waves
        const z = wave1 + wave2 + wave3;

        array[i * 3 + 2] = z;
      }

      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();

      // Slight rotation and tilt
      meshRef.current.rotation.x = -Math.PI / 3 + mousePosition.current.y * 0.1;
      meshRef.current.rotation.z = mousePosition.current.x * 0.05;
    }

    // Update lines to match mesh
    if (linesRef.current && meshRef.current) {
      const meshPositions = meshRef.current.geometry.attributes.position;
      const segments = 100;
      const size = 20;
      const lines: number[] = [];

      // Recreate vertical lines with updated heights
      for (let i = 0; i <= segments; i++) {
        for (let j = 0; j <= segments; j++) {
          if (j < segments) {
            const idx1 = j * (segments + 1) + i;
            const idx2 = (j + 1) * (segments + 1) + i;

            lines.push(
              meshPositions.array[idx1 * 3],
              meshPositions.array[idx1 * 3 + 1],
              meshPositions.array[idx1 * 3 + 2]
            );
            lines.push(
              meshPositions.array[idx2 * 3],
              meshPositions.array[idx2 * 3 + 1],
              meshPositions.array[idx2 * 3 + 2]
            );
          }
        }
      }

      // Recreate horizontal lines
      for (let j = 0; j <= segments; j++) {
        for (let i = 0; i <= segments; i++) {
          if (i < segments) {
            const idx1 = j * (segments + 1) + i;
            const idx2 = j * (segments + 1) + (i + 1);

            lines.push(
              meshPositions.array[idx1 * 3],
              meshPositions.array[idx1 * 3 + 1],
              meshPositions.array[idx1 * 3 + 2]
            );
            lines.push(
              meshPositions.array[idx2 * 3],
              meshPositions.array[idx2 * 3 + 1],
              meshPositions.array[idx2 * 3 + 2]
            );
          }
        }
      }

      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(lines, 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.rotation.copy(meshRef.current.rotation);
    }
  });

  return (
    <group position={[0, -2, -5]}>
      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* Directional lights */}
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />

      {/* Point lights for green-blue gradient effect */}
      <pointLight position={[-8, 5, 2]} intensity={3} color="#00ff88" distance={20} />
      <pointLight position={[8, 5, 2]} intensity={3} color="#0066ff" distance={20} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#00ccff" distance={15} />

      {/* Main mesh - hidden but used for calculations */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0088ff"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe lines */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.8}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}

export default FloatingTechShapes;
