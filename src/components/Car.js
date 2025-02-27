import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useLoading } from "../context/LoadingContext";

function Car({ cameraRef }) {
  const carRef = useRef();
  const [isModelReady, setIsModelReady] = useState(false);
  const [modelLoadError, setModelLoadError] = useState(null);
  const wheelRefs = useRef([]);
  const antennaRef = useRef();
  const [isOnGround, setIsOnGround] = useState(false);
  // Keyboard controls setup
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const { addLoadingItem, removeLoadingItem } = useLoading();

  // useEffect(() => {
  //   return () => removeLoadingItem("car");

  // }, [addLoadingItem, removeLoadingItem]);

  // Load the 3D model
  // const buggyModel = useLoader(
  //   GLTFLoader,
  //   "/3dModels/Buggy.glb",
  //   addLoadingItem("car"),
  //   removeLoadingItem("car"),
  //   (error) => {
  //     console.error("Error loading mode2l:", error);
  //     setModelLoadError(error);
  //     removeLoadingItem("car");
  //   }
  // );
  const buggyModel = useLoader(
    GLTFLoader,
    "/3dModels/toyota_hiace_2004.glb",
    (loader) => {
      loader.manager.onStart = () => addLoadingItem("car");
      loader.manager.onLoad = () => removeLoadingItem("car");
      loader.manager.onError = (url) => {
        console.error("Error loading mode2l:", url);
        setModelLoadError(url);
        removeLoadingItem("car");
      };
    }
  );

  useEffect(() => {
    if (buggyModel) {
      console.log("Model loaded:", buggyModel.scene.children[1]);
      buggyModel.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
        // Identify and store references to wheels and antenna
        if (child.name.includes("body_11")) {
          wheelRefs.current.push(child);
        }
        if (child.name.includes("body_9")) {
          antennaRef.current = child;
        }
      });
      setIsModelReady(true);
      removeLoadingItem("car");
    }
  }, [buggyModel]);

  useEffect(() => {
    if (carRef.current) {
      const checkGroundContact = () => {
        const ray = new rapier.Ray(carRef.current.translation(), {
          x: 0,
          y: -1,
          z: 0,
        });
        const hit = world.castRay(ray, 0.5, true);
        setIsOnGround(hit !== null);
      };

      const interval = setInterval(checkGroundContact, 100);
      return () => clearInterval(interval);
    }
  }, [carRef, rapier, world]);

  // Velocity state and movement constants
  const [velocity, setVelocity] = useState({ x: 0, z: 0 });
  const maxSpeed = 15; // Increased maximum speed for better performance
  const acceleration = 70; // Increased acceleration factor
  const deceleration = 15; // Adjusted deceleration factor
  const brakingFactor = 25; // Adjusted braking factor
  const rotationSpeed = 0.025; // Adjusted rotation speed for smoother turns

  // useEffect(() => {
  //   const unsubscribe = subscribeKeys(() => {
  //     // Force re-render when keys change
  //     setVelocity((prevVelocity) => ({ ...prevVelocity }));
  //   });
  //   return () => unsubscribe();
  // }, [subscribeKeys]);
  useFrame((state, delta) => {
    if (!carRef.current || !isOnGround) return;

    const keys = getKeys();
    const carPosition = carRef.current.translation();
    const rotation = carRef.current.rotation();
    const quaternion = new THREE.Quaternion(
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );
    const euler = new THREE.Euler().setFromQuaternion(quaternion, "YXZ");
    const direction = new THREE.Vector3();

    // Update velocity based on input
    if (keys.backward) {
      direction.set(0, 0, -1).applyEuler(euler);
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x + direction.x * acceleration * delta,
        z: prevVelocity.z + direction.z * acceleration * delta,
      }));
    } else if (keys.forward) {
      direction.set(0, 0, 1).applyEuler(euler);
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x + direction.x * acceleration * delta,
        z: prevVelocity.z + direction.z * acceleration * delta,
      }));
    } else {
      // Apply deceleration when no key is pressed
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x * Math.pow(1 - deceleration * delta, 1),
        z: prevVelocity.z * Math.pow(1 - deceleration * delta, 1),
      }));
    }

    // Limit speed
    const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);
    if (speed > maxSpeed) {
      setVelocity((prevVelocity) => ({
        x: prevVelocity.x * (maxSpeed / speed),
        z: prevVelocity.z * (maxSpeed / speed),
      }));
    }

    // Enhanced rotation handling
    const steeringAngle = rotationSpeed * (speed > maxSpeed * 0.75 ? 0.5 : 1);
    if (keys.left) {
      if (speed > 0.1) {
        euler.y += 0.4 * steeringAngle * (keys.backward ? -1 : 1);
      }
    }
    if (keys.right) {
      if (speed > 0.1) {
        euler.y -= 0.4 * steeringAngle * (keys.backward ? -1 : 1);
      }
    }

    // Apply velocity
    carPosition.x += velocity.x * delta;
    carPosition.z += velocity.z * delta;
    carRef.current.setTranslation(carPosition);

    // Convert Euler back to Quaternion and set rotation
    const newQuaternion = new THREE.Quaternion().setFromEuler(euler);
    carRef.current.setRotation(newQuaternion);
    // const carlocation = carRef.current.translation();
    // Update camera position
    if (cameraRef?.current) {
      // console.log(carRef.current);
      const cameraOffset = new THREE.Vector3(2, 18, -20); // Adjusted to follow the back of the car more closely
      cameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), euler.y);

      cameraRef.current.position.x = carPosition.x + cameraOffset.x;
      cameraRef.current.position.y = carPosition.y + cameraOffset.y;
      cameraRef.current.position.z = carPosition.z + cameraOffset.z;
      cameraRef.current.lookAt(carPosition.x, carPosition.y + 3, carPosition.z);
    }

    // Animate wheels
    const wheelRotationSpeed = speed * delta * 5; // Adjust rotation speed factor
    wheelRefs.current.forEach((wheel) => {
      wheel.rotation.x += wheelRotationSpeed;
    });

    // Animate antenna
    if (antennaRef.current) {
      antennaRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 5) * 0.1; // Adjust animation speed and amplitude
    }
  });

  const primitive = useMemo(
    () =>
      buggyModel && (
        <primitive
          object={buggyModel.scene}
          scale={4.1}
          rotation={[0, Math.PI, 0]}
          castShadow
        />
      ),
    [buggyModel]
  );

  if (modelLoadError) {
    console.error("Failed to load model:", modelLoadError);
  }

  return (
    <>
      <RigidBody
        ref={carRef}
        position={[0, 3.1, -150]}
        rotation={[0, Math.PI, 0]} // Rotate the car to face the reverse direction
        colliders="cuboid"
        mass={220} // Adjusted mass for better stability
        restitution={0.1} // Adjusted restitution for better collision response
        friction={0.2} // Adjusted friction for better grip
        linearDamping={0.1} // Adjusted linear damping for smoother motion
        angularDamping={0.1} // Adjusted angular damping for smoother rotation
        lockRotations={true}
        gravityScale={1} // Ensure gravity is applied
        linearVelocity={[0, -9.8, 0]} // Apply gravity to prevent floating
      >
        {/* Debug mesh - always visible */}
        {/* Model - shown when loaded */}
        {primitive}
      </RigidBody>

      {/* Add Joystick component */}
    </>
  );
}

export default Car;
