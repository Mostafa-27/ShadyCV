import { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";

function IronRod({ position, rotation = [0, 0, 0], height = 10 }) {
  const geometry = useMemo(
    () => <cylinderGeometry args={[0.2, 0.2, height, 32]} />,
    [height]
  );

  const material = useMemo(
    () => (
      <meshStandardMaterial color="#4a4a4a" metalness={0.8} roughness={0.2} />
    ),
    []
  );

  return (
    <mesh position={position} rotation={rotation}>
      {geometry}
      {material}
    </mesh>
  );
}

export default IronRod;
