import { MeshTransmissionMaterial, useGLTF, useProgress } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';

useGLTF.preload('media/models/torus-knotDecimated.glb'); // Preload model for faster rendering

import { useLoading } from '../context/LoadingContext';
import useIsMobile from './hooks/useIsMobile';




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
    const [deviceTier, setDeviceTier] = useState('high');

    // Refs
    const containerRef = useRef(null);
    const torus = useRef();
    const frameCountRef = useRef(0);

    // Detect low-end device (e.g., less than 6 CPU cores)
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 6;
    const targetFPS = isLowEnd ? 30 : 90;
    const frameInterval = 1000 / targetFPS; // Convert FPS to milliseconds per frame
    let lastFrameTime = performance.now();

    // Three.js hooks
    const { nodes } = useGLTF('media/models/torus-knotDecimated.glb', true);
    const { viewport } = useThree();
    const { progress } = useProgress();
    const { setModelProgress } = useLoading();
    
    useEffect(() => {
        // Check device capabilities on mount
        const checkPerformance = () => {
            // Check GPU tier using WebGL parameters
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            
            // Check CPU cores
            const cores = navigator.hardwareConcurrency || 4;
            
            // Check if mobile
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            // Determine device tier
            if (isMobile || cores < 4) {
                setDeviceTier('low');
            } else if (cores < 8) {
                setDeviceTier('medium');
            } else {
                setDeviceTier('high');
            }
        };
        console.log("deviceTier", deviceTier);
        
        checkPerformance();
    }, []);
    
    const materialProps = useMemo(() => ({
        thickness: 0.25,
        roughness: 0,
        transmission: 1,
        ior: 1.5,
        chromaticAberration: 0.22,
        BackSide: false,
        xSpeed: 0.006,
        ySpeed: 0.005,
        samples: {
            'low': 1,
            'medium': 4,
            'high': 6
        }[deviceTier],
        //resolution: 1024,
    }), [deviceTier]);

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
        //aconsole.log("is low end:", isLowEnd);
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
        }
    }, [onLoad]);

    // Intersection Observer setup
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setDebugState(prev => ({ ...prev, isVisible: entry.isIntersecting }));
        }, {
            root: null,
            rootMargin: '50px',
            threshold: 0.3
        });

        const canvas = document.querySelector('canvas');
        if (canvas) observer.observe(canvas);

        return () => {
            if (canvas) observer.unobserve(canvas);
        };
    }, []); // No dependencies needed


    // Initialize the worker
    const workerRef = useRef(null);

    useEffect(() => {
    workerRef.current = new Worker(new URL('../utils/workers/modelAnimationWorker.js', import.meta.url));

    workerRef.current.onmessage = (event) => {
        const { x, y } = event.data;
        if (torus.current) {
            torus.current.rotation.x = x;
            torus.current.rotation.y = y;
        }
    };

    // Start the worker with initial data
    workerRef.current.postMessage({
        xSpeed: materialProps.xSpeed,
        ySpeed: materialProps.ySpeed,
        startTime: performance.now() // Changed from frameCount
    });

    return () => {
        workerRef.current.terminate();
    };
}, [materialProps.xSpeed, materialProps.ySpeed]);

    // Animation frame
    // useFrame(() => {
    //     if (!debugState.isVisible || !torus.current) return; // Skip update if offscreen
    //     torus.current.rotation.x += materialProps.xSpeed;
    //     torus.current.rotation.y += materialProps.ySpeed;
    //         //console.log("rotation",torus.current.rotation)
            
    //     //     // Update debug state every 30 frames to avoid performance issues
    //     //     if (frameCountRef.current % 30 === 0) {
    //     //         updateDebugState();
    //     //         console.log('Mesh rotation:', {
    //     //             x: torus.current.rotation.x,
    //     //             y: torus.current.rotation.y,
    //     //             z: torus.current.rotation.z
    //     //         });
    //     //     }
        
    // });

    // Resize handler
    
    // Animation frame with FPS cap
    useFrame(() => {
        if (!torus.current) return;

        const now = performance.now();
        if (now - lastFrameTime < frameInterval) return; // Skip frame if not enough time passed
        lastFrameTime = now; // Update last frame time

        torus.current.rotation.x += materialProps.xSpeed;
        torus.current.rotation.y += materialProps.ySpeed;
    });
    
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