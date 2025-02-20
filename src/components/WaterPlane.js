import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaterPlane({ position = [0, -0.5, 0], size = 1000 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} ref={meshRef}>
      <planeGeometry args={[size, size, 128, 128]} />
      <shaderMaterial
        transparent={true}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(0x15b0f8) },
          uFoamColor: { value: new THREE.Color(0xffffff) },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;

          // Simplex 2D noise
          vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

          float noise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                    -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod(i, 289.0);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
              dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            vUv = uv;
            vec2 noiseCoord = uv * 8.0;
            
            float elevation = 
              1.0 * noise(noiseCoord + uTime * 0.3) +
              0.5 * noise(noiseCoord * 2.0 + uTime * 0.4) +
              0.25 * noise(noiseCoord * 4.0 + uTime * 0.5);
            
            vElevation = elevation;
            vec3 pos = position;
            pos.z += elevation * 2.0;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform vec3 uFoamColor;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            float mixStrength = (vElevation + 1.0) / 2.0;
            vec3 color = mix(uColor, uFoamColor, mixStrength * 0.2);
            float alpha = 0.8 + mixStrength * 0.2;
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export default WaterPlane;
