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
    smoothTouch: true,
    touchMultiplier: 1.2,
    infinite: false,
    gestureOrientation: "vertical",
    orientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    syncTouch: false,  
    touchInertiaMultiplier: 1.3,
    onTouch: (e) => {
      console.log('Touch detected:', e);
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