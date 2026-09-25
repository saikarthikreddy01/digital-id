import { useMemo } from 'react';
import * as THREE from 'three';

export function useTubeCurve() {
  return useMemo(() => {
    const points = [
      [-0.3, 0.1, 7],
      [0.2, 0.8, 3],
      [2.2, 0.9, -2],
      [2.7, -0.8, -7],
      [0.6, -1.8, -12],
      [-2.3, -0.4, -17],
      [-1.8, 1.8, -22],
      [1.1, 1.9, -27],
      [2.7, -0.2, -32],
      [0.4, -1.8, -37],
      [-2.3, 0.3, -42],
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));

    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.45);
  }, []);
}
