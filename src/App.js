import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import TerrainPlane from "./components/TerrainPlane";
import {
  OrbitControls,
  KeyboardControls,
  useKeyboardControls,
} from "@react-three/drei";
import Car from "./components/Car";
import Joystick from "./components/Joystick"; // Import Joystick component

function App() {
  // Keyboard controls setup
  var lastDir = "FORWARD";
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const handleJoystickMove = (event) => {
    const keys = getKeys();
    console.log(event.direction, "ss  ");
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
    console.log(getKeys());
  };

  const handleJoystickStop = () => {
    const keys = getKeys();
    keys.forward = false;
    keys.backward = false;
    keys.left = false;
    keys.right = false;
  };

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 25, 30], fov: 75 }} shadows>
        <color attach="background" args={["#87CEEB"]} />
        <fog attach="fog" args={["#87CEEB", 30, 181]} />
        {/* <OrbitControls
            minPolarAngle={Math.PI / 4 + 0.5}
            maxPolarAngle={Math.PI / 2}
            enablePan={true}
            maxZoom={50}
            minZoom={10}
          /> */}
        {/* Wrap the scene with the Physics component */}
        <Physics debug={false}>
          <TerrainPlane />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 20, 10]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Ensure Car is inside the Physics component */}
        </Physics>
      </Canvas>
      <Joystick move={handleJoystickMove} stop={handleJoystickStop} />{" "}
      {/* Add Joystick component */}
    </div>
  );
}

export default App;
