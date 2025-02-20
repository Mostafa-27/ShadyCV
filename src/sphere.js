import React, { useState, useEffect } from "react";
import useKeyboard from "./useKeyboard"; // Adjust the path as needed

const Sphere = () => {
  const [position, setPosition] = useState([0, 0, 0]);
  const keys = useKeyboard();
  const SPEED = 0.1;

  useEffect(() => {
    let newX = position[0];
    let newY = position[1];

    if (keys.ArrowUp) newY += SPEED;
    if (keys.ArrowDown) newY -= SPEED;
    if (keys.ArrowLeft) newX -= SPEED;
    if (keys.ArrowRight) newX += SPEED;

    setPosition([newX, newY, 0]);
  }, [keys, position]);

  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

export default Sphere;
