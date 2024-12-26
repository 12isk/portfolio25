"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ReactLenis, useLenis } from 'lenis/react';

import ProjectPage from './components/ProjectPage';
import Modal from './components/projectgallery/modal';
import ProjectList from './components/projectgallery/projectlist';
import About from './components/about';
import Contact from './components/contact';
import useIsMobile from './components/hooks/useIsMobile';

// Import the projects JSON file
import projects from "./data/projects.json";
import { lerp } from 'three/src/math/MathUtils';

const Scene = dynamic(() => import('./components/Presentation'), {
  ssr: false // Ensure server-side rendering is disabled for dynamic import
});

export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const mainRef = useRef(null);
  const isMobile = useIsMobile();

  const lenisOptions = {
    lerp: 0.03,
    duration: 0.85,
    smoothTouch: false, //smooth scroll for touch devices
    smooth: true,
  };

   // Use the Lenis hook to track scroll position and log it
   useLenis((lenis) => {
    console.log("Scroll position:", lenis.scroll);
  });

  return (
    <ReactLenis root options={lenisOptions}>
      <main ref={mainRef}>
          <Scene />
          <div className="body">
            <ProjectList id="projects" projects={projects} setModal={setModal} />
            {isMobile ? <div style={{ height: "20vh" }} /> : <div style={{ height: "40vh" }} />}
            <About />
            {isMobile ? <div style={{ height: "20vh" }}></div> : null}
          </div>
          <Modal projects={projects} modal={modal} />
          <Contact />
        
      </main>
    </ReactLenis>
  );
}
