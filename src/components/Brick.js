import React from "react";
import { Box } from "@react-three/drei";

function Brick({ position, color, rotation }) {
  return (
    <Box args={[2, 0.1, 3.5]} position={position} rotation={rotation}>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

export default Brick;
