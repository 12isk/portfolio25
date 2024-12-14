import { Environment, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
// ./components/Presentation.js

import React, { useEffect, useState } from 'react';

import Cursor from './Cursor';
import GradientCursor from './GradientCursor';
import Model from './Model';

export default function Presentation() {
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState(getWindowDimensions());

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const manageMouseMove = (e) => {
        const { clientX, clientY } = e;
      }
    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        // Call handleResize immediately to set initial size
        handleResize();

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {/* <h1
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                lol
            </h1> */}
            <GradientCursor isHovered={isHovered} />
            <Canvas>
                <color attach="background" args={[0,0,0]} />
                
                <directionalLight intensity={0.5} position={[0, 3, 2]} />
                <Environment preset="city" />
                <Model
                    onPointerOver={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                />
            <Text scale={getWindowDimensions().width/950} font='fonts/Dirtyline.otf' position={[0,0,-1]}
                onPointerOver={() => setIsHovered(true)} 
                onPointerLeave={() => setIsHovered(false)}>
                CoMinG SoON
            </Text>
            </Canvas>
        </div>
    );
}
