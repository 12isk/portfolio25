import { Environment, Text, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
// ./components/Presentation.js

import React, { Suspense, useEffect, useState } from 'react';

import GradientCursor from '../GradientCursor';
import useIsMobile from '../hooks/useIsMobile';
import useIsTablet from '../hooks/useIsTablet';
import Model from '../Model';
import Available from '../precisions/available';
import Clock from '../precisions/clock';
import Specialty from '../precisions/specialty';

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState(getWindowDimensions());
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();
    const textScaleDivider = 
      isMobile ? 
        660 : (
             isTablet ? 
               (window.innerHeight >= 1360 ? 1050: 1080)
             : 950);
    const { progress } = useProgress();
    const [modelLoaded, setModelLoaded] = useState(false);
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
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
        <div style={{ 
            position: 'relative', 
            width: '100vw', 
            height: '100vh',
            backgroundColor: 'black'
        }}>
            <Specialty />
            <Available home={true} />
            <Clock />
            <GradientCursor isHovered={isHovered} />
            
            {!modelLoaded && (
                <div style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    zIndex: 10
                }}>
                    <span>Loading... {Math.round(progress)}%</span>
                </div>
            )}
            
            <Canvas>
                <color attach="background" args={[0,0,0]} />
                <directionalLight intensity={0.5} position={[0, 3, 2]} />
                <Environment preset="city" />
                <Suspense fallback={null}>
                    <Model
                        onPointerOver={() => setIsHovered(true)}
                        onPointerLeave={() => setIsHovered(false)}
                        onLoad={() => setModelLoaded(true)}
                    />
                    <Text 
                        scale={getWindowDimensions().width/textScaleDivider} 
                        font='fonts/Dirtyline.otf' 
                        position={isMobile ? [0,0.8,-1] : 
                            isTablet ? 
                              (window.innerHeight >= 1360 ? [0,0.9,-1] : [0,0.9,-1] )
                            : [0,-0.5,-1]}
                        onPointerOver={() => setIsHovered(true)} 
                        onPointerLeave={() => setIsHovered(false)}>
                        CrEaTivE
                    </Text>
                    <Text 
                        scale={getWindowDimensions().width/textScaleDivider} 
                        font='fonts/Dirtyline.otf' 
                        position={isMobile ? [0,0,-1] : 
                            isTablet ? 
                              (window.innerHeight >= 1360 ? [0,0,-1] : [0,-0.2,-1] )
                            : [0,-0.5,-1]}
                        onPointerOver={() => setIsHovered(true)} 
                        onPointerLeave={() => setIsHovered(false)}>
                        DeVeLopPeR
                    </Text>
                </Suspense>
            </Canvas>
        </div>
    );
}
