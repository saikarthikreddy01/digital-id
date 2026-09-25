import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { HexTube, IntroCameraRig } from './HexTube';
import { useTubeCurve } from './useTubeCurve';

function TubeWorld({ onMessageChange }) {
  const curve = useTubeCurve();
  const highlightRef = useRef(null);

  return (
    <>
      <color attach="background" args={['#010202']} />
      <hemisphereLight args={['#dfe5e0', '#010202', 0.24]} />
      <directionalLight position={[5, 7, 3]} color="#f0f4f1" intensity={0.34} />
      <pointLight
        ref={highlightRef}
        color="#ffffff"
        intensity={19}
        distance={12}
        decay={2}
      />
      <IntroCameraRig
        curve={curve}
        highlightRef={highlightRef}
        onMessageChange={onMessageChange}
      />
      <HexTube curve={curve} />
    </>
  );
}

export default function Scene({ onMessageChange }) {
  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 0], fov: 73, near: 0.02, far: 110 }}
      aria-label="A dark green hex-scale tube rolling into the digital ID builder"
    >
      <Suspense fallback={null}>
        <TubeWorld onMessageChange={onMessageChange} />
      </Suspense>
    </Canvas>
  );
}
