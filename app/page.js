"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { motion,AnimatePresence } from 'framer-motion';

import Modal from './components/projectgallery/modal';
import ProjectList from './components/projectgallery/projectList';
import About from './components/about';
import Contact from './components/contact';
import useIsMobile from './components/hooks/useIsMobile';
import useIsTablet from './components/hooks/useIsTablet';
import Specialty from './components/precisions/specialty';
import Preloader from './loading';
import { useLoading, LoadingProvider } from './context/LoadingContext';


// Import the projects JSON file
import projects from "./data/projects.json";

const Hero = dynamic(() => import('./components/Hero'), {
  ssr: false,
  loading: () => (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      backgroundColor: 'black' 
    }} />
  ),
  priority: true
});



function HomeContent(){
  const [modal, setModal] = useState({ active: false, index: 0 });
  //const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const mainRef = useRef(null);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { modelProgress, loading, setLoading } = useLoading();

  // const lenisOptions = {
  //   lerp: 0.03,
  //   duration: 0.85,
  //   smoothTouch: false,
  //   smooth: true,
  // };

  const lenis = useLenis();

  

  useEffect(() => {
    setLoading(false);
    if (modelProgress === 100){
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    

    const preloadHero = async () => {
      try {
        await import('./components/Hero');
        // You could trigger additional progress here if needed
      } catch (error) {
        console.error('Error preloading Hero:', error);
      }
    };
    
    preloadHero();

    
  }, [modelProgress, setLoading]);

  return (
    <>
      {/* <AnimatePresence mode="wait">
        {loading && <Preloader progress={modelProgress} />}
      </AnimatePresence> */}
      <main 
        ref={mainRef} 
       
      >
        <Hero />
        <div style={{ height: "15vh" }} />
        <div className="body">
          <div id="projects">
            <ProjectList projects={projects} setModal={setModal} />
          </div>
          {isMobile ? <div style={{ height: "20vh" }} /> : <div style={{ height: "20vh" }} />}
          <div id="about">
            <About />
          </div>
          <div className="responsiveSpacer"/>      
        <Modal projects={projects} modal={modal} />
        <div id="contact">
          <Contact lenis={lenis} />
        </div>
      </div>

      </main>
    </>
  );
}

export default function Home() {
  return (
  <LoadingProvider>
    <HomeContent />
  </LoadingProvider>
  )
}

const ResponsiveSpacer = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const { isTablet } = useIsTablet();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Function to update height
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    // Set initial height
    updateHeight();

    // Add event listener for window resize
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []); // Empty dependency array means this runs once on mount

  if (isMobile) {
    return <div style={{ height: "20vh" }} />;
  }

  if (isTablet) {
    return windowHeight >= 1360 ? null : <div style={{ height: "10vh" }} />;
  }

  return <div style={{ height: "60vh" }} />;
};

