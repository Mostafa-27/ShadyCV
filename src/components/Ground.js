import * as THREE from "three";
import { useEffect, useRef, useMemo } from "react";

function Ground({ width = 200, length = 200, depth = 5, color = 0x4a5d23 }) {
  const meshRef = useRef();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(width, length),
    [width, length]
  );

  const material = useMemo(
    () => <meshStandardMaterial color={color} />,
    [color]
  );

  useEffect(() => {
    meshRef.current.geometry = geometry;
    meshRef.current.rotation.x = -Math.PI / 2;
  }, [geometry]);

  return <mesh ref={meshRef}>{material}</mesh>;
}

export default Ground;
