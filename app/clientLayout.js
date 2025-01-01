// Create a client component wrapper
"use client";
import { ReactLenis } from "lenis/react";
import Menu from "./components/menu";
export default function ClientLayout({ children }) {
  const lenisOptions = {
    lerp: 0.03,
    duration: 0.85,
    smoothTouch: true, // Enable smooth scroll for touch devices
    smooth: true,
    touchMultiplier: 2, // Adjust this value for touch sensitivity
    wheelMultiplier: 1, // Adjust this for mouse wheel sensitivity
    touchInertiaMultiplier: 2.5, // Controls inertia feeling on touch devices
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Menu />
      {children}
    </ReactLenis>
  );
}