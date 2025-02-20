import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import TerrainPlane from "./components/TerrainPlane";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import Car from "./components/Car";

function App() {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "brake", keys: ["Space"] },
      ]}
    >
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
      </div>
    </KeyboardControls>
  );
}

export default App;
