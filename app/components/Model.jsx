import { MeshTransmissionMaterial, useGLTF, useProgress } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useMotionValue } from 'framer-motion';
import { useControls } from 'leva';
import React, { useEffect, useRef, useState } from 'react';
import useIsMobile from './hooks/useIsMobile';
import Preloader from './preloader';

export default function Model() {

    //creating a state to know when cursor is hovering over the model/text
    const [isHovered, setIsHovered] = useState(false);
    const [meshScale, setMeshScale] = useState(0.4);
    const isMobile = useIsMobile();

    const torus = useRef();
    const { nodes } = useGLTF('media/models/torus-knot.glb');
    const { active, progress, errors, item, loaded, total } = useProgress();
    const { viewport } = useThree();
    
    // Show the loading screen with progress while the model is loading
    if ( progress < 100) {
        
        return <Preloader progress={progress} />;
    }
    

    // const materialProps = useControls('material',{
    //     thickness: {value: 0.25, min: 0.01, max: 1, step: 0.05},
    //     roughness: {value: 0, min: 0, max: 1, step: 0.1},
    //     transmission: {value: 1, min: 0, max: 1, step: 0.1},
    //     ior: {value: 1.5, min: 1, max: 2, step: 0.1},
    //     chromaticAberration: {value: 0.22, min: 0, max: 1},
    //     BackSide: {value: true},
    //     xSpeed: {value: 0.016, min: 0, max: 0.1, step: 0.01},
    //     ySpeed: {value: 0.01, min: 0, max: 10, step: 0.01},
    //     //zSpeed: {value: 0.01, min: 0, max: 10, step: 0.01},
    // });
    const materialProps = {
        thickness: 0.25,
        roughness: 0,
        transmission: 1,
        ior: 1.5,
        chromaticAberration: 0.22,
        BackSide: true,
        xSpeed: 0.016,
        ySpeed: 0.01,
      };



    useFrame(() => {
        torus.current.rotation.x += materialProps.xSpeed;
        torus.current.rotation.y += materialProps.ySpeed;
    });

    useEffect(() => {

        //handle resize function to change the scale of the model based on the window width
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMeshScale(0.7);
            } else {
                setMeshScale(0.4);
            }
            // console.log(window.innerWidth, meshScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial scale based on current window width

        return () => {window.removeEventListener('resize', handleResize); };
    }, []);

    // Show the loading screen with progress while the model is loading
    // if (isLoading || progress < 100) {
    //     return <LoadingScreen progress={progress} />;
    // }

    return (
        <group scale={isMobile ? viewport.width/5.5 : viewport.width / 6}>
           
            <mesh ref={torus} {...nodes.TorusKnot001} scale={meshScale}>
                <MeshTransmissionMaterial {...materialProps} />
            </mesh>
        </group>
    );
}
