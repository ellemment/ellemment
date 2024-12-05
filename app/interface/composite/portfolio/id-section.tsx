// #app/interface/composite/portfolio/id-section.tsx

"use client";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
  Text,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Band from "./id-card";

export function IdSection() {
  return (
    <div className="relative h-screen w-full bg-transparent">
      <div className="flex h-screen w-full bg-transparent">
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics
            debug={false}
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
          >
            <Band />
          </Physics>
          <Environment  blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");