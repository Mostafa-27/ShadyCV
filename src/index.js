import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { KeyboardControls } from "@react-three/drei";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <KeyboardControls
    map={[
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
      { name: "brake", keys: ["Space"] },
    ]}
  >
    <App />
  </KeyboardControls>
);
