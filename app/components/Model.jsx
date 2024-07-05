import React from 'react';
import { useGLTF, Text, MeshTransmissionMaterial } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { BackSide } from 'three';

export default function Model() {

    const torus = React.useRef();
    const { nodes } = useGLTF('media/torus.glb');
    const {  viewport } = useThree();

    useFrame( () => {
        torus.current.rotation.x += 0.016;
        torus.current.rotation.y += 0.01;
    });

    const materialProps = useControls({
        thickness: {value: 0.2, min: 0.01, max: 1, step: 0.05},
        roughness: {value: 0, min: 0, max: 1, step: 0.1},
        transmission: {value: 1, min: 0, max: 1, step: 0.1},
        ior: {value: 1.5, min: 1, max: 2, step: 0.1},
        chromaticAberration: {value: 0.02, min: 0, max: 1},
        BackSide: {value: false},
    });

  return (
    <group scale={viewport.width / 5.5}>
        <Text fontSize={.7} font='fonts/Dirtyline.otf' position={[0,0,-1]}>
            Me aNd mY Torus
        </Text>
        <mesh ref={torus} {...nodes.Torus002} scale={.9}>
            <MeshTransmissionMaterial {...materialProps}/>
        </mesh>

    </group>
  )
}
