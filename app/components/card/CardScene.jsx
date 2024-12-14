"use client";
import { Canvas } from '@react-three/fiber'
import React from 'react'
import CardModel from './CardModel';
import { Environment } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';


export default function CardScene({project}) {
  return (
    <div className='relative h-screen'>
      <Canvas>
        <directionalLight intensity={3} position={[0,3,2]}/>
        <OrbitControls />
        <Environment preset="dawn"/>
        <CardModel  imagePath={project.src}/>
      </Canvas>
    </div>
  )
}
