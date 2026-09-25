import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.0022);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Sophisticated Restrained Lighting (Clean Neutral Silver & Soft Slate)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLightSilver = new THREE.PointLight(0xffffff, 20, 180);
    pointLightSilver.position.set(40, 40, 30);
    scene.add(pointLightSilver);

    const pointLightSubtle = new THREE.PointLight(0x94a3b8, 15, 160);
    pointLightSubtle.position.set(-40, -30, 20);
    scene.add(pointLightSubtle);

    // 3. Floating 3D Particles Matrix (Refined Silver / White Monochromatic Starfield)
    const particleCount = window.innerWidth < 768 ? 260 : 550;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const silverWhite = new THREE.Color('#ffffff');
    const slateLight = new THREE.Color('#94a3b8');
    const slateMuted = new THREE.Color('#475569');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 220;
      positions[i3 + 1] = (Math.random() - 0.5) * 260;
      positions[i3 + 2] = (Math.random() - 0.5) * 160;

      const pick = Math.random();
      const col = pick > 0.6 ? silverWhite : pick > 0.25 ? slateLight : slateMuted;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft round particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,0.9)');
    grad.addColorStop(0.35, 'rgba(255,255,255,0.5)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Abstract Minimal Geometric Wireframes
    const group = new THREE.Group();
    scene.add(group);

    // Clean Silver Wireframe Icosahedron
    const icoGeom = new THREE.IcosahedronGeometry(13, 0);
    const icoWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeom),
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.14,
      })
    );
    icoWire.position.set(42, 14, -28);
    group.add(icoWire);

    // Secondary Wireframe Octahedron
    const octGeom = new THREE.OctahedronGeometry(9, 0);
    const octWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(octGeom),
      new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.12,
      })
    );
    octWire.position.set(-45, -20, -20);
    group.add(octWire);

    // Clean Subtle Orbit Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(20, 0.06, 12, 80), ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.position.set(42, 14, -28);
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(15, 0.05, 12, 80), ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.position.set(-45, -20, -20);
    group.add(ring2);

    // 5. Mouse & Scroll Lerp Smoothing
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // 6. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (document.hidden) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetCameraX = mouseX * 6;
      targetCameraY = mouseY * 5 - scrollY * 0.032;

      camera.position.x += (targetCameraX - camera.position.x) * 0.04;
      camera.position.y += (targetCameraY - camera.position.y) * 0.04;
      camera.lookAt(0, -scrollY * 0.032, 0);

      scrollY += (targetScrollY - scrollY) * 0.06;

      if (!prefersReducedMotion) {
        icoWire.rotation.x = elapsedTime * 0.12;
        icoWire.rotation.y = elapsedTime * 0.16;
        ring1.rotation.z = elapsedTime * 0.08;

        octWire.rotation.x = -elapsedTime * 0.1;
        octWire.rotation.y = elapsedTime * 0.12;
        ring2.rotation.z = -elapsedTime * 0.06;

        particles.rotation.y = elapsedTime * 0.015 + scrollY * 0.0002;
        particles.rotation.x = Math.sin(elapsedTime * 0.04) * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      icoGeom.dispose();
      octGeom.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      id="webgl-background"
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    />
  );
}
