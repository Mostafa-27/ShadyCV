import { Text3D, Center } from "@react-three/drei";
import IronRod from "./IronRod";

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

  return (
    <group position={position}>
      <Center>
        <group rotation={rotation} position={[0.1, 0, -20]}>
          <Text3D
            font="/fonts/Dancing Script SemiBold_Regular.json"
            size={size}
            height={height}
            curveSegments={32}
            bevelEnabled
            bevelSize={0.01}
            bevelThickness={0.01}
            letterSpacing={-0.75} // Added negative letter spacing to bring letters closer
          >
            {text}
            <meshStandardMaterial color={color} />
          </Text3D>
        </group>
      </Center>

      {/* Support Rods - Adjusted positions for tighter text */}
      <IronRod
        position={[-2.7, -0.55, 4]}
        height={rodHeight}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <IronRod
        position={[-2.7, -1.6, -6.5]}
        height={rodHeight}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <IronRod
        position={[-2.7, -1.0, -1.6]}
        height={rodHeight}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      {/* <IronRod
        // position={[rodSpacing, 5, -2]}
        height={rodHeight}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      /> */}
    </group>
  );
}

export default Text3DComponent;
