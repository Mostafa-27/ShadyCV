import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import TerrainPlane from "./components/TerrainPlane";
import { useKeyboardControls } from "@react-three/drei";
import { useCallback, useMemo } from "react";
import Joystick from "./components/Joystick";
import { useLoading } from "./context/LoadingContext";

function App() {
  var lastDir = "FORWARD";
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { isLoading } = useLoading();

  const handleJoystickMove = useCallback(
    (event) => {
      const keys = getKeys();

      switch (event.direction) {
        case "FORWARD":
          keys.forward = true;
          keys.backward = false;
          keys.left = false;
          keys.right = false;
          lastDir = "FORWARD";
          break;
        case "BACKWARD":
          keys.forward = false;
          keys.backward = true;
          keys.left = false;
          keys.right = false;
          lastDir = "BACKWARD";
          break;
        case "LEFT":
          if (lastDir === "FORWARD") {
            keys.forward = true;
            keys.backward = false;
            keys.left = true;
            keys.right = false;
          } else {
            keys.forward = false;
            keys.backward = true;
            keys.left = true;
            keys.right = false;
          }
          break;
        case "RIGHT":
          if (lastDir === "FORWARD") {
            keys.forward = true;
            keys.backward = false;
            keys.left = false;
            keys.right = true;
          } else {
            keys.forward = false;
            keys.backward = true;
            keys.left = false;
            keys.right = true;
          }
          break;
        default:
          break;
      }
    },
    [getKeys]
  );

  const handleJoystickStop = useCallback(() => {
    const keys = getKeys();
    keys.forward = false;
    keys.backward = false;
    keys.left = false;
    keys.right = false;
  }, [getKeys]);

  const canvas = useMemo(
    () => (
      <Canvas camera={{ position: [0, 25, 30], fov: 75 }} shadows>
        <color attach="background" args={["#87CEEB"]} />
        <fog attach="fog" args={["#87CEfB", 100, 230]} />
        <Physics debug={false}>
          <TerrainPlane />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
        </Physics>
      </Canvas>
    ),
    []
  );

  const joystick = useMemo(
    () => <Joystick move={handleJoystickMove} stop={handleJoystickStop} />,
    [handleJoystickMove, handleJoystickStop]
  );

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      {isLoading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <>
          {canvas}
          {joystick}
        </>
      )}
    </div>
  );
}

export default App;
