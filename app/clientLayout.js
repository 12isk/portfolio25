// Create a client component wrapper
"use client";
import { ReactLenis } from "lenis/react";
import Menu from "./components/menu";
export default function ClientLayout({ children }) {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1,
    smoothTouch: true,
    touchMultiplier: 2,
    infinite: false,
    gestureOrientation: "vertical",
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchInertiaMultiplier: 2,
    smooth: {
      mouse: 0.75,
      touch: 0.8,
      wheel: 0.75,
    },
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Menu />
      {children}
    </ReactLenis>
  );
}