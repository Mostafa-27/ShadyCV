import { useEffect, useRef, useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import { useThree } from "@react-three/fiber";
import Mountain from "./Mountain";
import WaterPlane from "./WaterPlane";
import Ground from "./Ground";
import Text3DComponent from "./Text3DComponent";
import Car from "./Car";
import Arrow from "./Arrow";

function TerrainPlane() {
  const cameraRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const mountains = useMemo(
    () => (
      <>
        <Mountain
          position={[120, 0, -230]}
          height={80}
          width={30}
          baseColor={0x228b22}
          middleColor={0x32cd32}
          peakColor={0xadff2f}
        />
        <Text3DComponent
          text="MOSTAFA SOLIMAN"
          rotation={[0, 0, 0]}
          position={[10, 18, -193]}
          size={5}
          color="#ffffff"
        />
      </>
    ),
    []
  );

  const arrows = useMemo(
    () => (
      <>
        <Arrow
          position={[0, 0.1, -180]}
          direction={[0, 0, 1]}
          text="Projects"
        />
        <Arrow
          position={[10, 0.1, -180]}
          direction={[1, 0, 0]}
          text="Personal Info"
        />
        <Arrow
          position={[-10, 0.1, -180]}
          direction={[-1, 0, 0]}
          text="EXperiences"
        />
      </>
    ),
    []
  );

  const car = useMemo(() => <Car cameraRef={cameraRef} />, [cameraRef]);

  return (
    <>
      {car}
      {mountains}
      {arrows}
      <RigidBody type="fixed" colliders="cuboid">
        <Ground width={400} length={600} depth={0.03} color={0x4a5d23} />
      </RigidBody>
      <WaterPlane position={[0, -3, 0]} size={2000} />
    </>
  );
}

export default TerrainPlane;
