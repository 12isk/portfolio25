"use client";
import { ReactLenis } from "lenis/react";
import Menu from "./components/menu";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lenisOptions = {
    lerp: 0.03,
    duration: 1,
    smoothTouch: false,
    touchMultiplier: 1.2,
    infinite: false,
    gestureOrientation: "vertical",
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: true,  
    touchInertiaMultiplier: 1.3,
    breakpoints: {
      tablet: {
        smooth: true,
        breakpoint: 1024,
        touchMultiplier: 1.5,  // Slightly higher for tablets
        duration: 0.8,  // Slightly faster for tablets
      }
    },
    onTouch: (e) => {
      if (e.event) {
        e.event.preventDefault(); // Prevent default touch behavior
      }
    },
  };
  if (!mounted) return null;

  return (
    <ReactLenis root options={lenisOptions}>
      <Menu />
      {children}
    </ReactLenis>
  );
}