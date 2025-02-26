import { Text3D, Center } from "@react-three/drei";
import IronRod from "./IronRod";
import { useMemo } from "react";

function Text3DComponent({
  text,
  position,
  size = 3,
  height = 0.5,
  color = "#ffffff",
  rotation = [0, 0, 0],
}) {
  const rodHeight = 5;
  const rodSpacing = 3;

  const text3D = useMemo(
    () => (
      <Text3D
        font="/fonts/Dancing Script SemiBold_Regular.json"
        size={size}
        height={height}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.01}
        letterSpacing={-0.75}
      >
        {text}
        <meshStandardMaterial color={color} />
      </Text3D>
    ),
    [text, size, height, color]
  );

  const rods = useMemo(
    () => (
      <>
        <IronRod
          position={[19, -0.55, -4]}
          height={rodHeight}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <IronRod
          position={[0, -1.6, -6.5]}
          height={rodHeight}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <IronRod
          position={[-15, -1.0, -1.6]}
          height={rodHeight}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </>
    ),
    [rodHeight]
  );

  return (
    <group position={position}>
      <Center>
        <group rotation={rotation} position={[0.1, 0, -20]}>
          {text3D}
        </group>
      </Center>
      {rods}
    </group>
  );
}

export default Text3DComponent;
