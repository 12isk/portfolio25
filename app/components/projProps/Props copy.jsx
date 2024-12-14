"use client";

import { Canvas } from '@react-three/fiber';
import { Environment, Overlay, MeshTransmissionMaterial, OrbitControls, Text, Text3D } from '@react-three/drei';
import { useControls } from 'leva';
import Rings from './Rings'; // Assuming Rings is defined elsewhere
import { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Replace with your CSS module or file

function dirtify(str) {
  return str.split('').map((char, index) => {
    // Check if the index is even or odd and adjust case accordingly
    if (index % 2 === 0) {
      return char.toUpperCase();
    } else {
      return char.toLowerCase();
    }
  }).join('');
}

export default function Props({ project }) {
  // Manage window dimensions in state
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  
  const materialProps = useControls('text material',{
    clearcoat: {value: 0.1, min: 0, max: 1, step: 0.05},
    thickness: {value: 0, min: 0.01, max: 1, step: 0.05},
    roughness: {value: .05, min: 0, max: 1, step: 0.1},
    transmission: {value: 1, min: 0, max: 1, step: 0.1},
    ior: {value: 1.5, min: 1, max: 2, step: 0.1},
    chromaticAberration: {value: 0.5, min: 0, max: 1},
    BackSide: {value: true},
  }, {collapsed : true });

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate text scale based on window width and title length
  const baseScale = windowDimensions.width / 950; // Adjust the divisor as needed
  const titleLengthFactor = Math.max(0.5, 1 - project.title.length / 30); // Decrease scale for longer titles
  const textScale = baseScale * titleLengthFactor; // Combine the factors


  return (
    <div className="relative h-screen">
      <div className="canvas-container">
        <Canvas>
          <directionalLight intensity={3} position={[0, 3, 2]} />
          <directionalLight intensity={3} position={[0, -3, 2]} />
          <pointLight intensity={2} position={[0, -5, 5]} />
          <ambientLight intensity={1} />
          {/* <OrbitControls /> */}
          <Environment preset="sunset" />
          <Overlay
            root={document.body} 
            zIndex={2} 
            style={{ 
              pointerEvents: 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <Rings />
          </Overlay>
          {/* <Text3D  scale={1} font={"../../fonts/Dirtyline.json"} position={[-8, 0, -1]}
          anchorX="center" // Centering text horizontally
          anchorY="middle" // Centering text vertically
          >
            <MeshTransmissionMaterial {...materialProps} />
            {dirtify(project.title)}
          </Text3D> */}
          {/* <Text scale={textScale} font="../../fonts/Dirtyline.otf" position={[0, 0, -1]}>
            {dirtify(project.title)}
          </Text> */}
        </Canvas>
      </div>

     {/* HTML Content */}
     <div className="relative z-10 p-8">
        <h1 className={styles.title}>{project.title}</h1>
        <img 
          src={`/${project.src[0]}`} 
          alt={project.title} 
          className={styles.image} 
        />
        <p className={styles.type}>{project.desc}</p>
        <p className={styles.description}>{project.paragraph}</p>
      </div>
    </div>
  );
}
