"use client";
import { ReactLenis } from "lenis/react";
import Menu from "./components/menu";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const isSlower = typeof window !== "undefined" && navigator.hardwareConcurrency < 6;

  const lenisOptions = {
    lerp: isSlower ? 0.1 : 0.07,
    duration: isSlower ? 0.65 : 1,
    smoothTouch: true,
    touchMultiplier: 1.1,
    infinite: false,
    smoothWheel: true,
    // wheelMultiplier: isSlower ? 0.8 : 1,
    onTouch: (e) => {
      if (e.event?.target?.closest(".no-scroll")) {
        e.event.preventDefault();
      }
    },
  };

  

  return (
    <ReactLenis root options={lenisOptions} suppressHydrationWarning>
      <Menu />
      {children}
    </ReactLenis>
  );
}
