import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createHexTexture } from './hexTexture';

export function HexTube({ curve }) {
  const { gl } = useThree();
  const texture = useMemo(() => {
    const hex = createHexTexture();
    hex.anisotropy = gl.capabilities.getMaxAnisotropy();
    return hex;
  }, [gl]);
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 640, 1.4, 36, false),
    [curve],
  );

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        map={texture}
        color="#ffffff"
        roughness={0.76}
        metalness={0.04}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export function IntroCameraRig({ curve, highlightRef, onMessageChange }) {
  const { camera } = useThree();
  const frames = useMemo(() => curve.computeFrenetFrames(640, false), [curve]);
  const progressRef = useRef(0.018);
  const messageIndex = useRef(-1);
  const initialized = useRef(false);

  useFrame((state, delta) => {
    const frameDelta = Math.min(delta, 1 / 30);
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = THREE.MathUtils.clamp(window.scrollY / maxScroll, 0, 1);
    const easedScroll = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
    const targetProgress = THREE.MathUtils.lerp(0.018, 0.965, easedScroll);
    progressRef.current = THREE.MathUtils.damp(progressRef.current, targetProgress, 2.6, frameDelta);
    const progress = progressRef.current;
    const nextMessage = scrollProgress < 0.23 ? 0 : scrollProgress < 0.5 ? 1 : scrollProgress < 0.77 ? 2 : 3;
    if (nextMessage !== messageIndex.current) {
      messageIndex.current = nextMessage;
      onMessageChange?.(nextMessage);
    }
    const frameIndex = Math.min(639, Math.floor(progress * 640));
    const position = curve.getPointAt(progress);
    const tangent = frames.tangents[frameIndex];
    const normal = frames.normals[frameIndex];
    const binormal = frames.binormals[frameIndex];
    const cameraTarget = position
      .clone()
      .addScaledVector(normal, 0.92)
      .addScaledVector(binormal, 0.42);
    const lookTarget = position.clone().addScaledVector(tangent, 2.8);
    const roll = progress * Math.PI * 2.6;

    if (!initialized.current) {
      camera.position.copy(cameraTarget);
      initialized.current = true;
    } else {
      camera.position.lerp(cameraTarget, 1 - Math.exp(-frameDelta * 3.4));
    }
    camera.up.copy(normal).applyAxisAngle(tangent, roll);
    camera.lookAt(lookTarget);

    if (highlightRef.current) {
      highlightRef.current.position
        .copy(position)
        .addScaledVector(normal, 0.2)
        .addScaledVector(tangent, 1.8);
      highlightRef.current.intensity = 19 + Math.sin(state.clock.elapsedTime * 1.8) * 2;
    }

  });

  return null;
}
