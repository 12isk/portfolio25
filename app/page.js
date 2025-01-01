"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, use } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';

import Modal from './components/projectgallery/modal';
import ProjectList from './components/projectgallery/projectList';
import About from './components/about';
import Contact from './components/contact';
import useIsMobile from './components/hooks/useIsMobile';
import Specialty from './components/precisions/specialty';


// Import the projects JSON file
import projects from "./data/projects.json";

const Hero = dynamic(() => import('./components/Hero'), {
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


  const [lenisInstance, setLenisInstance] = useState(null);

  const lenis = useLenis(); // Access Lenis instance

  useEffect(() => {
    if (lenis) {
      console.log("Lenis instance home:", lenis);
    }
    return () => {
      if (lenis) {
        lenis.destroy(); // Clean up the Lenis instance on unmount
      }
    };
  }, [lenis]);

  // In Home component
return (
  
    <main ref={mainRef}>
      <Hero />
      <div style={{ height: "15vh" }} />
      <div className="body">
        <div id="projects">  {/* Add wrapper with ID */}
          <ProjectList projects={projects} setModal={setModal} />
        </div>
        {isMobile ? <div style={{ height: "20vh" }} /> : <div style={{ height: "40vh" }} />}
        <div id="about">     {/* Add wrapper with ID */}
          <About />
        </div>
        {isMobile ? <div style={{ height: "20vh" }}></div> : null}
      </div>
      <Modal projects={projects} modal={modal} />
      <div id="contact">    {/* Add wrapper with ID */}
        <Contact lenis={lenis} />
      </div>
    </main>
  
);
}
