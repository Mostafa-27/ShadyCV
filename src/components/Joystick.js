import React, { useState } from "react";
import { Joystick } from "react-joystick-component";
import { useKeyboardControls } from "@react-three/drei";

const JoystickComponent = ({ move, stop }) => {
  const [direction, setDirection] = useState("");
  const [, setKeys] = useKeyboardControls();

  const handleMove = (event) => {
    setDirection(event.direction);
    switch (event.direction) {
      case "FORWARD":
        setKeys((keys) => ({
          ...keys,
          forward: true,
          backward: false,
          left: false,
          right: false,
        }));
        break;
      case "BACKWARD":
        setKeys((keys) => ({
          ...keys,
          forward: false,
          backward: true,
          left: false,
          right: false,
        }));
        break;
      case "LEFT":
        setKeys((keys) => ({
          ...keys,
          forward: false,
          backward: false,
          left: true,
          right: false,
        }));
        break;
      case "RIGHT":
        setKeys((keys) => ({
          ...keys,
          forward: false,
          backward: false,
          left: false,
          right: true,
        }));
        break;
      default:
        break;
    }
  };

  const handleStop = () => {
    setDirection("");
    setKeys((keys) => ({
      forward: false,
      backward: false,
      left: false,
      right: false,
    }));
  };

  return (
    <div style={{ position: "absolute", bottom: 50, left: 50 }}>
      <Joystick
        size={100}
        baseColor="gray"
        stickColor="black"
        move={move}
        stop={stop}
      />
    </div>
  );
};

export default JoystickComponent;
