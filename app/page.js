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
import Specialty from './components/precisions/specialty';
import Preloader from './loading/page';
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

const Model = dynamic(() => import('./components/Model'), {
  ssr: false,
  loading: () => <div style={{height: "100vh"}} />
});

function HomeContent(){
  const [modal, setModal] = useState({ active: false, index: 0 });
  //const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const mainRef = useRef(null);
  const isMobile = useIsMobile();
  const { modelProgress, loading, setLoading } = useLoading();

  const lenisOptions = {
    lerp: 0.03,
    duration: 0.85,
    smoothTouch: false,
    smooth: true,
  };

  const lenis = useLenis();

  

  useEffect(() => {
    
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
      <AnimatePresence mode="wait">
        {loading && <Preloader progress={modelProgress} />}
      </AnimatePresence>
      <motion.main 
        ref={mainRef} 
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: .7, delay: loading ? 0 : 0.2 }}
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
          {isMobile ? <div style={{ height: "20vh" }}></div> : <div style={{ height: "60vh" }}></div>}
        </div>
        <Modal projects={projects} modal={modal} />
        <div id="contact">
          <Contact lenis={lenis} />
        </div>
      </motion.main>
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