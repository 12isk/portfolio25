"use client";
import { ReactLenis } from "lenis/react";
import Menu from "./components/menu";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const isSlower = typeof window !== "undefined" && navigator.hardwareConcurrency < 6;

  const lenisOptions = {
    lerp: 0.03,
    duration: isSlower ? 0.7 : 0.7,
    smoothTouch: true,
    touchMultiplier: 1.2,
    infinite: false,
    gestureOrientation: "vertical",
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    //syncTouch: true,  
    //touchInertiaMultiplier: 1.3,
    breakpoints: {
      tablet: {
        smooth: true,
        breakpoint: 1024,
        touchMultiplier: 1.5,  // Slightly higher for tablets
        duration: 0.8,  // Slightly faster for tablets
      }
    }
  };

  return (
    <ReactLenis root options={lenisOptions} suppressHydrationWarning>
      <Menu />
      {children}
    </ReactLenis>
  );
}
