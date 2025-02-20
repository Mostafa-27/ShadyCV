import { useEffect, useRef } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useThree } from "@react-three/fiber"; // Use useThree!
import * as THREE from "three";
import Mountain from "./Mountain";
import WaterPlane from "./WaterPlane";
import Ground from "./Ground";
import Text3DComponent from "./Text3DComponent";
import Car from "./Car";

function TerrainPlane() {
  const cameraRef = useRef();
  const { camera } = useThree(); // Get the main camera

  useEffect(() => {
    cameraRef.current = camera; // Store camera reference
  }, [camera]);

  return (
    <>
      {/* PerspectiveCamera is no longer needed here because useThree provides the main camera */}
      <Car cameraRef={cameraRef} />
      {/* Mountains */}

      <Mountain
        position={[100, 0, -100]}
        height={12}
        baseColor={0x228b22}
        middleColor={0x32cd32}
        peakColor={0xadff2f}
      />

      <Mountain
        position={[-100, 0, -100]}
        height={12}
        baseColor={0x228b22}
        middleColor={0x32cd32}
        peakColor={0xadff2f}
      />
      <CuboidCollider args={[15, 12, 15]} position={[-100, 6, -100]} />

      <Mountain
        position={[0, 0, -200]}
        height={12}
        baseColor={0x228b22}
        middleColor={0x32cd32}
        peakColor={0xadff2f}
      />

      <Mountain
        position={[50, 0, -150]}
        height={12}
        baseColor={0x228b22}
        middleColor={0x32cd32}
        peakColor={0xadff2f}
      />

      <Mountain
        position={[0, 0, -50]}
        height={12}
        baseColor={0x228b22}
        middleColor={0x32cd32}
        peakColor={0xadff2f}
      />
      <Text3DComponent
        text="SHADY ABOZAID"
        rotation={[0, -Math.PI / 2, 0]}
        position={[6.5, 14, -40]} // Position on top of the mountain
        size={5}
        color="#ffffff"
      />

      {/* Ground */}
      <RigidBody type="fixed" colliders="cuboid">
        <Ground width={500} length={600} depth={0.03} color={0x4a5d23} />
      </RigidBody>
      <WaterPlane position={[0, -3, 0]} size={2000} />
    </>
  );
}

export default TerrainPlane;
