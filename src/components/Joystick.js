import React, { useState, useEffect } from "react";
import { Joystick } from "react-joystick-component";

const JoystickComponent = ({ move, stop }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1080);
  const width = window.innerWidth;
  const height = window.innerHeight;
  useEffect(() => {
    const lockOrientation = async () => {
      if (window.innerWidth < window.innerHeight) {
        try {
          if (window.screen.orientation && window.screen.orientation.lock) {
            await window.screen.orientation.lock("landscape");
          }
        } catch (err) {
          console.warn("Orientation lock failed:", err);
        }
      }
    };

    window.addEventListener("resize", lockOrientation);
    lockOrientation(); // Initial check

    return () => window.removeEventListener("resize", lockOrientation);
  }, []);

  return (
    <>
      {isMobile && window.innerHeight > window.innerWidth && (
        <div className="rotate-message">
          Please rotate your device to landscape mode
        </div>
      )}

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
