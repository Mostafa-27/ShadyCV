import React, { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function Arrow({ position, direction, text }) {
  const arrowLength = 20;
  const arrowColor = 0x00f0ff;

  const arrowHelper = useMemo(
    () => (
      <arrowHelper
        args={[
          new THREE.Vector3(...direction),
          new THREE.Vector3(0, 0, 0),
          arrowLength - 3,
          arrowColor,
        ]}
      />
    ),
    [direction, arrowLength, arrowColor]
  );

  const textComponent = useMemo(
    () => (
      <Text
        position={[direction[0] * arrowLength, 1.5, direction[2] * arrowLength]}
        rotateY={Math.PI}
        fontSize={3}
        color="#ffffff"
      >
        {text}
      </Text>
    ),
    [direction, arrowLength, text]
  );

  return (
    <group position={position}>
      {arrowHelper}
      {textComponent}
    </group>
  );
}

export default Arrow;
