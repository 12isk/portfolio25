import { Environment, PerformanceMonitor, Text, useProgress } from '@react-three/drei';
import React, { Suspense, useCallback, useEffect, useState } from 'react';

import GradientCursor from '../GradientCursor';
import useIsMobile from '../hooks/useIsMobile';
import useIsTablet from '../hooks/useIsTablet';
import Available from '../precisions/available';
import Clock from '../precisions/clock';
import Specialty from '../precisions/specialty';
import VideoModel from '../videoModel';

export default function Hero() {
    const [isHovered, setIsHovered] = useState(false);
    // const [dimensions, setDimensions] = useState(getWindowDimensions());
    // const isMobile = useIsMobile();
    // const isTablet = useIsTablet();
    // const textScaleDivider = 
    //   isMobile ?    
    //     660 : (
    //          isTablet ? 
    //            (window.innerHeight >= 1360 ? 1050: 1080)
    //          : 950);
    
    // const { progress } = useProgress();
    // const [modelLoaded, setModelLoaded] = useState(false);
    // function getWindowDimensions() {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     return {
    //         width,
    //         height
    //     };
    // }
    // const [dpr, setDpr] = useState(1.5);

    // const handleResize = useCallback(() => {
    //     setDimensions(getWindowDimensions());
    // }, []);
    
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [handleResize]); // Only runs when necessary
    

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
            <VideoModel />
            {/* {!modelLoaded && (
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
            <Canvas dpr={dpr}>
                <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(0.9)} />

                <color attach="background" args={[0,0,0]} />
                <directionalLight intensity={0.5} position={[0, 3, 2]} />
                <Environment preset="city" />
                {process.env.NODE_ENV === 'development' && <Perf />}

                <Suspense fallback={null}>
                    <Model
                        onPointerOver={() => setIsHovered(true)}
                        onPointerLeave={() => setIsHovered(false)}
                        onLoad={() => setModelLoaded(true)}
                    />
                    <Text 
                        scale={getWindowDimensions().width/textScaleDivider} 
                        font='fonts/Dirtyline.otf' 
                        position={isMobile ? 
                            (window.innerWidth === 768 && window.innerHeight === 1024)  ? 
                              [0, 1, -1]    // iPad mini dimensions
                              : [0, 0.8, -1]  // Regular mobile
                            : isTablet ? 
                              (window.innerHeight >= 1360 ? 
                                [0, 0.9, -1] 
                                : [0, 1, -1]
                              ) 
                              : [0, 0.9, -1]
                          }
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
            </Canvas> */}
        </div>
    );
}
