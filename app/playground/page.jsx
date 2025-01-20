"use client";
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { useControls } from 'leva';
import { MeshTransmissionMaterial, useGLTF, useProgress, Environment, Text, OrbitControls } from '@react-three/drei';
import { useFrame, useThree, Canvas } from '@react-three/fiber';

import useIsMobile from '../components/hooks/useIsMobile';
import useIsTablet from '../components/hooks/useIsTablet';

export default function ModelPlayground() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const isMobile = useIsMobile();
    const textScaleDivider = isMobile ? 570 : 950;
    const isTablet = useIsTablet();
    const [modelLoaded, setModelLoaded] = useState(false);

    function getWindowDimensions() {
        if (typeof window === 'undefined') return { width: 0, height: 0 };
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    useEffect(() => {
        function handleResize() {
            setDimensions(getWindowDimensions());
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative',
            backgroundColor: 'transparent'  }}>
            
            {/* <span className={"info"}>Play around and find out what you like !</span> */}
            
            <Canvas>
                <color attach="background" args={[0,0,0]} />
                <directionalLight intensity={4} position={[0, 3, 2]} />
                <directionalLight intensity={4} position={[0, -3, 2]} />
                <ambientLight intensity={1} />
                <Environment preset="city" />
                <Suspense fallback={null}>
                    <Text 
                        scale={getWindowDimensions().width/textScaleDivider} 
                        font='fonts/Dirtyline.otf' 
                        position={isTablet ? [0,-1,-1]: [0,0,-1]}
                        onPointerOver={() => setIsHovered(true)} 
                        onPointerLeave={() => setIsHovered(false)}>
                        PlAyGrOuNd
                    </Text>
                    <Text 
                        scale={getWindowDimensions().width/textScaleDivider/4} 
                        font='fonts/Dirtyline.otf' 
                        position={isTablet ? [0,-2,-1]: [0,-2,-2]}
                        onPointerOver={() => setIsHovered(true)} 
                        onPointerLeave={() => setIsHovered(false)}>
                        FinD oUT wHaT yOu LiKe !
                    </Text>
                    <Text 
                        scale={getWindowDimensions().width/textScaleDivider/5.5} 
                        font='fonts/Dirtyline.otf' 
                        position={isTablet ? [0,-2,-1]: [0,-3.4,-2]}
                        onPointerOver={() => setIsHovered(true)} 
                        onPointerLeave={() => setIsHovered(false)}>
                        (EveNtUaLly I'lL aDd MoRE moDels)
                    </Text>
                    {/* <Text 
                        scale={getWindowDimensions().width/textScaleDivider/6} 
                        font='fonts/Dirtyline.otf' 
                        position={isTablet ? [0,-2,-1]: [0,-3.9,-2]}
                        onPointerOver={() => setIsHovered(true)} 
                        onPointerLeave={() => setIsHovered(false)}>
                         YoU cAn dRaG aNd zOoM
                    </Text> */}
                    <OrbitControls />
                    <Model
                        isHovered={isHovered}
                        setIsHovered={setIsHovered}
                        onLoad={() => setModelLoaded(true)}
                    />
                </Suspense>
            </Canvas>
            
        </div>
    );
}

function Model({ isHovered, setIsHovered, onLoad }) {
    const [meshScale, setMeshScale] = useState(0.4);
    const isMobile = useIsMobile();

    // Refs
    const containerRef = useRef(null);
    const torus = useRef();

    // Three.js hooks
    const { nodes } = useGLTF('/media/models/torus-knot2.glb');
    const { viewport } = useThree();
    
    // Material properties using Leva controls
    const materialProps = useControls('Material Properties', {
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        backside: false,
        samples: { value: 10, min: 1, max: 32, step: 1 },
        resolution: { value: 2048, min: 256, max: 2048, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
        ior: { value: 1, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0.03, min: 0, max: 1 },
        anisotropy: { value: 0.42, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: .3, min: 0, max: 1 },
        attenuationDistance: { value: 9, min: 0, max: 10, step: 0.01 },
        // attenuationColor: '#ffffff',
        // color: '#4ECDC4',
        // bg: '#FF6B6B',
        xSpeed: { value: 0.006, min: 0, max: 0.02, step: 0.001 },
        ySpeed: { value: 0.005, min: 0, max: 0.02, step: 0.001 },
        zSpeed: { value: 0, min: 0, max: 0.02, step: 0.001 },
    });

    useEffect(() => {
        if (nodes) {
            onLoad?.();
        }
    }, [nodes, onLoad]);

    useFrame(() => {
        if (torus.current) {
            torus.current.rotation.x += materialProps.xSpeed;
            torus.current.rotation.y += materialProps.ySpeed;
            torus.current.rotation.z += materialProps.ySpeed;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            const newScale = window.innerWidth < 768 ? 0.7 : 0.4;
            setMeshScale(newScale);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <group 
            ref={containerRef}
            scale={isMobile ? viewport.width/5.5 : viewport.width / 6}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <mesh 
                ref={torus} 
                {...nodes.TorusKnot001} 
                scale={meshScale}
            >
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    );
}