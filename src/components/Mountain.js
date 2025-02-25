import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

function Mountain({
  height = 12,
  width = 15, // New width prop with default value
  position = [-7.5, 0, -7.5],
  baseColor = 0x4a5d23,
  middleColor = 0x8b5a2b,
  peakColor = 0xa0a0a0,
}) {
  const meshRef = useRef();

  useEffect(() => {
    const heightFactor = height / 12; // Scale factor based on default height
    const shape = new THREE.Shape();
    const points = [
      [0, 0],
      [2, 3 * heightFactor],
      [4, 5 * heightFactor],
      [7, height], // Main peak scaled by height prop
      [10, 6 * heightFactor],
      [13, 4 * heightFactor],
      [15, 0],
    ];

    shape.moveTo(points[0][0], points[0][1]);
    points.forEach((point) => shape.lineTo(point[0], point[1]));
    shape.lineTo(points[0][0], points[0][1]);

    const extrudeSettings = {
      depth: width * heightFactor, // Use width prop for depth
      bevelEnabled: true,
      bevelThickness: 0.5 * heightFactor,
      bevelSize: 0.3 * heightFactor,
      bevelSegments: 3,
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const noise2D = createNoise2D();
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const colorAttribute = new THREE.BufferAttribute(colors, 3);

    for (let i = 0; i < positions.count; i++) {
      let x = positions.getX(i);
      let y = positions.getY(i);
      let z = positions.getZ(i);

      // Scale noise based on height
      const largeNoise = noise2D(x * 0.1, z * 0.1) * 2 * heightFactor;
      const mediumNoise = noise2D(x * 0.3, z * 0.3) * 0.8 * heightFactor;
      const smallNoise = noise2D(x * 0.8, z * 0.8) * 0.3 * heightFactor;

      const totalNoise = largeNoise + mediumNoise + smallNoise;
      positions.setY(i, y + totalNoise);

      const normalizedHeight = (y + totalNoise) / height;
      const color = new THREE.Color();
      if (normalizedHeight < 0.3) {
        color.setHex(baseColor);
      } else if (normalizedHeight < 0.6) {
        color.setHex(middleColor);
      } else {
        color.setHex(peakColor);
      }

      color.toArray(colors, i * 3);
    }

    geometry.setAttribute("color", colorAttribute);
    positions.needsUpdate = true;
    geometry.computeVertexNormals();

    meshRef.current.geometry = geometry;
  }, [height, width, baseColor, middleColor, peakColor]); // Add width to dependency array

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh
        ref={meshRef}
        position={position}
        receiveShadow
        rotation={[0, -Math.PI / 2, 0]}
      >
        <meshStandardMaterial
          vertexColors
          roughness={0.8}
          metalness={0.2}
          normalScale={new THREE.Vector2(1, 1)}
        />
      </mesh>
      <CuboidCollider args={[65, 120, width]} position={position} /> // Use
      width prop for collider
    </RigidBody>
  );
}

export default Mountain;
