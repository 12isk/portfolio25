import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { use } from 'react'
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

// TODO: Add fallback Texture
export default function CardModel({ imagePath }) {

    const { nodes } = useGLTF('../media/models/card.glb');
    const { viewport } = useThree();
    console.log(imagePath);

    const plasticMaterialProps = {
        thickness: 0.05,
        clearcoat: 0,
        roughness: 0,
        transmission: 1,
        ior: 1,
        chromaticAberration: 0.01,
        backside: false, // Correct casing for `backside`
      };
      
    
      const iridescentMaterialProps = useControls('Iridescent Material', {
        metalness: { value: 1, min: 0, max: 1, step: 0.01 }, // Fully metallic
        roughness: { value: 0.1, min: 0, max: 1, step: 0.01 }, // Slightly smooth
        clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
        sheen: { value: 1, min: 0, max: 1, step: 0.01 },
        sheenColor: { value: { r: 1, g: 0.5, b: 0.2 } },
        transmission: { value: 0.8, min: 0, max: 1, step: 0.01 },
        roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        thickness: { value: 1, min: 0, max: 10, step: 0.1 },
        envMapIntensity: { value: 2, min: 0, max: 10, step: 0.1 },
    }, { collapsed: true });
    
    const baseMaterialProps = useControls('Base Material', {
        roughness: { value: 1, min: 0, max: 1, step: 0.01 }, // Slightly smooth
        clearcoat: { value: 0, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0, min: 0, max: 10, step: 0.1 },
        color: { r: 0, b: 0, g: 0, a: 0 },
    }, { collapsed: true });
    

    const texture = useLoader(TextureLoader, `/${imagePath[0]}`);
    texture.repeat.set(2, 2);  // Adjust the values to scale the texture down
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping; // Repeat the texture
    texture.repeat.x = - 1;
    texture.center.set(0, 0); // Center the texture
    texture.offset.set(0, 0);    // Offset the texture if needed
    texture.flipY = true;   // Flip the texture if needed
    


  return (
      <group  scale = {viewport.width / 3.5} position={[0,-5,0]}>
        <group name="Parent" >
            <mesh
            name="card"
            castShadow
            receiveShadow
            geometry={nodes.card.geometry}

            >
                <MeshTransmissionMaterial {...iridescentMaterialProps}/>
            </mesh>
            
            
            <mesh
            name="card_interior"
            castShadow
            receiveShadow
            geometry={nodes.card_interior.geometry}

            scale={[1, 1, 1]}  // Scale mesh to make texture appear smaller

            >
                <MeshTransmissionMaterial {...baseMaterialProps} map={texture}/>
            </mesh>

            <mesh
            name="card_backside"
            castShadow
            receiveShadow
            geometry={nodes.backside.geometry}

            scale={[1, 1, 1]}  // Scale mesh to make texture appear smaller

            >
                <MeshTransmissionMaterial {...baseMaterialProps} map={texture}/>
            </mesh>
            
            <mesh
            name="wrapper"
            castShadow
            receiveShadow
            geometry={nodes.wrapper.geometry}
            >
                <MeshTransmissionMaterial {...plasticMaterialProps}/>

            </mesh>
            
           
        </group>
      </group>
  )
}
