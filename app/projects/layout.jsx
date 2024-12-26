"use client";
import GradientCursor from "../components/GradientCursor";
import { ReactLenis, useLenis } from 'lenis/react'


export default function ProjectLayout({ children }) {
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothTouch: false, //smooth scroll for touch devices
        smooth: true,
      };
    return (
        <>
        <GradientCursor />
        
        
            
            <>{children}</>
        

        </>
);
  }