import { MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

export default function Rings() {
  
  const { nodes } = useGLTF('../media/models/rings.glb');
  console.log(nodes);

  // Declaring refs for the two groups of rings
  const normalRing = React.useRef();
  const wavyRing = React.useRef();

  // Defining scale state for the rings
  const [meshScale, setMeshScale] = useState(0.4);

  // Defining the noise function
  const noise3D = createNoise3D();
  

  const materialProps = useControls('ring material',{
    clearcoat: {value: 0.25, min: 0, max: 1, step: 0.05},
    thickness: {value: 0.12, min: 0.01, max: 1, step: 0.05},
    roughness: {value: 0, min: 0, max: 1, step: 0.1},
    transmission: {value: 1, min: 0, max: 1, step: 0.1},
    ior: {value: 1.5, min: 1, max: 2, step: 0.1},
    chromaticAberration: {value: 0.22, min: 0, max: 1},
    BackSide: {value: true},
  }, {collapsed : true });

  const movementControls = useControls('movement', {
    amplitude: { value: 1.5, min: 0, max: 2, step: 0.1 },
    xSpeed: { value: 0.17, min: 0, max: 1, step: 0.01 },
    ySpeed: { value: 0.15, min: 0, max: 1, step: 0.01 },
    zSpeed: { value: 0.15, min: 0, max: 1, step: 0.01 },
  }, { collapsed: true });

// -------------- Resize function to change the scale of the model based on the window width

useEffect(() => {



  //handle resize function to change the scale of the model based on the window width
  const handleResize = () => {
      if (window.innerWidth < 768) {
          setMeshScale(1.6);
      } else {
          setMeshScale(3);
      }
      console.log(window.innerWidth, meshScale);
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Set initial scale based on current window width

  return () => {window.removeEventListener('resize', handleResize)};
}, [meshScale]);


 

// -------------- Declaring the animation function for the rings
useFrame((state, delta) => {
  const time = state.clock.getElapsedTime();

  if (normalRing.current) {
    normalRing.current.position.x = noise3D(time * movementControls.xSpeed, 0, 0) * movementControls.amplitude;
    normalRing.current.position.y = 0.272 + noise3D(0, time * movementControls.ySpeed, 0) * movementControls.amplitude;
    normalRing.current.position.z = noise3D(0, 0, time * movementControls.zSpeed) * movementControls.amplitude;
  }

  if (wavyRing.current) {
    wavyRing.current.position.x = noise3D(time * movementControls.xSpeed + 10, 0, 0) * movementControls.amplitude;
    wavyRing.current.position.y = noise3D(0, time * movementControls.ySpeed + 10, 0) * movementControls.amplitude;
    wavyRing.current.position.z = noise3D(0, 0, time * movementControls.zSpeed + 10) * movementControls.amplitude;
  }
});
  






  return (
    <group scale= {meshScale}>
      <group ref={normalRing} name="normal ring" position={[0, 0.272, 0]} scale={0.1}>
        <mesh
          name="gem"
          castShadow
          receiveShadow
          geometry={nodes.gem.geometry}
          material={nodes.gem.material}
          position={[0, 3.502, 0]}
          >
          <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
        <mesh
          name="gem-circ-hold"
          castShadow
          receiveShadow
          geometry={nodes['gem-circ-hold'].geometry}
          material={nodes['gem-circ-hold'].material}
          position={[0, 3.502, 0]}
          >
          <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
        <mesh
          name="holder"
          castShadow
          receiveShadow
          geometry={nodes.holder.geometry}
          material={nodes.holder.material}
          position={[0, 3.502, 0]}
          >
          <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
        <mesh
          name="ribgbase"
          castShadow
          receiveShadow
          geometry={nodes.ribgbase.geometry}
          material={nodes.ribgbase.material}
          position={[-0.009, 2.342, 0]}
          scale={[0.528, 0.172, 0.465]}
          >
          <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
        <mesh
          name="ring"
          castShadow
          receiveShadow
          geometry={nodes.ring.geometry}
          material={nodes.ring.material}
          position={[0, 0.349, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={2.183}
          >
          <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
      </group>
      <group ref={wavyRing} name="wavy" >
        <mesh
          name="wavy"
          castShadow
          receiveShadow
          geometry={nodes.wavy.geometry}
          material={nodes.wavy.material}
          rotation={[0, -0.868, 0]}
          >
          <MeshTransmissionMaterial {...materialProps}/>
        </mesh>
      </group>
    </group>
  
  )
}
