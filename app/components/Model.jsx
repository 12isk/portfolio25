import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei';
import { useFrame, useState, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React from 'react';
import { BackSide } from 'three';

export default function Model() {

    //creating a state to know when cursor is hovering over the model/text
    const [isHovered, setIsHovered] = React.useState(false);

    const torus = React.useRef();
    const { nodes } = useGLTF('media/torus-knot.glb');
    const {  viewport } = useThree();

    useFrame( () => {
        torus.current.rotation.x += 0.016;
        torus.current.rotation.y += 0.01;
    });

    const materialProps = useControls({
        thickness: {value: 0.25, min: 0.01, max: 1, step: 0.05},
        roughness: {value: 0, min: 0, max: 1, step: 0.1},
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: {value: 1.5, min: 1, max: 2, step: 0.1},
        chromaticAberration: {value: 0.22, min: 0, max: 1},
        BackSide: {value: true},
    });

  return (
    <group scale={viewport.width / 6}>
        {/* <Text fontSize={.9} font='fonts/Dirtyline.otf' position={[0,0,-1]}
          onPointerOver={() => setIsHovered(true)} 
          onPointerLeave={() => setIsHovered(false)}>
            Me aNd mY Torus
        </Text> */}
        <mesh ref={torus} {...nodes.TorusKnot001} scale={.4}>
            <MeshTransmissionMaterial {...materialProps}/>
        </mesh>

    </group>
  )
}
