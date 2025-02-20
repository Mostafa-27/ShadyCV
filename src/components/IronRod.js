import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";

function IronRod({ position, rotation = [0, 0, 0], height = 10 }) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[0.2, 0.2, height, 32]} />
      <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

export default IronRod;
