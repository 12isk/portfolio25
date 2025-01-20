import { MeshTransmissionMaterial, useGLTF, useProgress } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import useIsMobile from './hooks/useIsMobile';
import { useLoading } from '../context/LoadingContext';

export default function Model({ onLoad }) {
    // States for debugging
    const [debugState, setDebugState] = useState({
        isVisible: true,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        frameCount: 0
    });
    const [isHovered, setIsHovered] = useState(false);
    const [meshScale, setMeshScale] = useState(0.4);
    const isMobile = useIsMobile();

    // Refs
    const containerRef = useRef(null);
    const torus = useRef();
    const frameCountRef = useRef(0);

    // Three.js hooks
    const { nodes } = useGLTF('media/models/torus-knot2.glb', true);
    const { viewport } = useThree();
    const { progress } = useProgress();
    const { setModelProgress } = useLoading();
    
    // Material properties exposed for debugging
    const materialProps = useMemo(() => ({
        thickness: 0.25,
        roughness: 0,
        transmission: 1,
        ior: 1.5,
        chromaticAberration: 0.22,
        BackSide: false,
        xSpeed: 0.006,
        ySpeed: 0.005,
    }), []);

    // Update debug state
    const updateDebugState = () => {
        if (torus.current) {
            setDebugState(prev => ({
                ...prev,
                position: {
                    x: torus.current.position.x,
                    y: torus.current.position.y,
                    z: torus.current.position.z
                },
                rotation: {
                    x: torus.current.rotation.x,
                    y: torus.current.rotation.y,
                    z: torus.current.rotation.z
                },
                frameCount: frameCountRef.current
            }));
        }
    };

    useEffect(() => {
        // Create smooth transition to target progress
        let startProgress = 0;
        const targetProgress = progress;
        const duration = 1000; // 1 second
        const startTime = performance.now();

        function updateProgress() {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smooth easing function
            const easedProgress = progress * (2 - progress);
            
            const currentProgress = Math.floor(startProgress + (targetProgress - startProgress) * easedProgress);
            setModelProgress(currentProgress);

            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            }
        }

        requestAnimationFrame(updateProgress);
    }, [progress, setModelProgress]);
    // Notify when model is loaded
    useEffect(() => {
        if (nodes) {
            onLoad?.();
            // Log initial mesh rotation
            // console.log('Initial mesh rotation:', {
            //     x: torus.current?.rotation.x || 0,
            //     y: torus.current?.rotation.y || 0,
            //     z: torus.current?.rotation.z || 0
            // });
        }
    }, [nodes, onLoad, materialProps, viewport]);

    // Intersection Observer setup
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setDebugState(prev => ({ ...prev, isVisible: entry.isIntersecting }));
            });
        }, options);

        const canvas = document.querySelector('canvas');
        if (canvas) {
            observer.observe(canvas);
        }

        return () => {
            if (canvas) {
                observer.unobserve(canvas);
            }
        };
    }, []);

    // Animation frame
    useFrame(() => {
        if (debugState.isVisible && torus.current) {
            torus.current.rotation.x += materialProps.xSpeed;
            torus.current.rotation.y += materialProps.ySpeed;
            frameCountRef.current += 1;
            
        //     // Update debug state every 30 frames to avoid performance issues
        //     if (frameCountRef.current % 30 === 0) {
        //         updateDebugState();
        //         console.log('Mesh rotation:', {
        //             x: torus.current.rotation.x,
        //             y: torus.current.rotation.y,
        //             z: torus.current.rotation.z
        //         });
        //     }
        }
    });

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            const newScale = window.innerWidth < 768 ? 0.7 : 0.4;
            setMeshScale(newScale);
            setDebugState(prev => ({ ...prev, meshScale: newScale }));
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Expose debug object to window for console access
    // useEffect(() => {
    //     window._modelDebug = {
    //         state: debugState,
    //         materialProps,
    //         refs: {
    //             torus: torus.current,
    //             container: containerRef.current
    //         },
    //         viewport
    //     };
    // }, [debugState, materialProps, viewport]);

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