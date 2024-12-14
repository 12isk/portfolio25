"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, Image } from '@react-three/drei';
import { useControls } from 'leva';
import Rings from './Rings';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function Props({ project }) {
  // Manage window dimensions in state
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const materialProps = useControls('text material', {
    clearcoat: { value: 0.1, min: 0, max: 1, step: 0.05 },
    thickness: { value: 0, min: 0.01, max: 1, step: 0.05 },
    roughness: { value: 0.05, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2, step: 0.1 },
    chromaticAberration: { value: 0.5, min: 0, max: 1 },
    BackSide: { value: true },
  }, { collapsed: true });

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate text scale based on window width and title length
  const baseScale = windowDimensions.width / 950;
  const titleLengthFactor = Math.max(0.5, 1 - project.title.length / 30);
  const textScale = baseScale * titleLengthFactor;

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Canvas positioned to cover the entire screen */}
      <Canvas 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none', // Important: allows interaction with HTML underneath
          zIndex: 2 
        }}
      >
        <directionalLight intensity={3} position={[0, 3, 2]} />
        <directionalLight intensity={3} position={[0, -3, 2]} />
        <pointLight intensity={2} position={[0, -5, 5]} />
        <ambientLight intensity={1} />
        <Environment preset="sunset" />
        <Image 
          url={`../${project.src[0]}`}
          position={[0, 0, 3]}
          width={2}
          height={2}
          rotation={[0, 0, 0]}
          transparent={true}
          opacity={1}
        />
        {/* Rings component will now float over HTML */}
        <Rings />
      </Canvas>

      {/* HTML Content */}
      <div className="relative z-10 p-8">
        <h1 className={styles.title}>{project.title}</h1>
        {/* <img 
          src={`/${project.src[0]}`} 
          alt={project.title} 
          className={styles.image} 
        /> */}
        <p className={styles.type}>{project.desc}</p>
        <p className={styles.description}>{project.paragraph}</p>
      </div>
    </div>
  );
}