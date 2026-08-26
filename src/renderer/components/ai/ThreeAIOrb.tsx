import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeAIOrbProps {
  onClick?: () => void;
}

export const ThreeAIOrb: React.FC<ThreeAIOrbProps> = ({ onClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = 64;
    const height = 64;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Glowing 3D Sphere Geometry
    const geometry = new THREE.IcosahedronGeometry(0.9, 12);
    const material = new THREE.MeshStandardMaterial({
      color: 0xD9531E,
      emissive: 0x0D3842,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Surrounding Particle Stars / Energy Ring
    const particlesCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 1.2 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i + 1] = radius * Math.sin(phi);
      positions[i + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xE06A3B,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD9531E, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      sphere.rotation.x += 0.008;
      sphere.rotation.y += 0.012;
      particleSystem.rotation.y -= 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      onClick={onClick}
      title="Toggle AI Companion Chatbox"
      className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 ai-orb-glow"
    >
      <div ref={mountRef} className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center pointer-events-none" />
    </div>
  );
};
