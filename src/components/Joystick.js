import React, { useState, useEffect } from "react";
import { Joystick } from "react-joystick-component";

const JoystickComponent = ({ move, stop }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1080);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <div style={{ position: "absolute", bottom: 50, left: 50 }}>
          <Joystick
            size={100}
            baseColor="gray"
            stickColor="black"
            move={move}
            stop={stop}
          />
        </div>
      )}
    </>
  );
};

export default JoystickComponent;
