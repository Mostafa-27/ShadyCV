import * as THREE from "three";
import { useEffect, useRef } from "react";

function Ground({ width = 200, length = 200, depth = 5, color = 0x4a5d23 }) {
  const meshRef = useRef();

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(width, length);
    meshRef.current.geometry = geometry;
    meshRef.current.rotation.x = -Math.PI / 2; // Rotate to lie flat
  }, [width, length]);

  return (
    <mesh ref={meshRef}>
      <meshStandardMaterial
        color={color}
        // side={THREE.DoubleSide}
        // roughness={0.8}
        // metalness={0.1}
      />
    </mesh>
  );
}

export default Ground;
