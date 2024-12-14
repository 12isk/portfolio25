"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import ContinuousScroll from './components/SmoothScroll';
import ProjectPage from './components/ProjectPage';
import Project from './components/projectgallery/project';
import Modal from './components/projectgallery/modal';

// Import the projects JSON file
import projects from "./data/projects.json";

const Scene = dynamic(() => import('./components/Presentation'), {
  ssr: false // Ensure server-side rendering is disabled for dynamic import
});

export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const mainRef = useRef(null);


  useEffect(() => {
    const lenis = new Lenis(); 
    console.log(mainRef.current);
  }, []);
  
  

  return (
  
    <main ref ={mainRef} className="relative h-screen overflow-y-scroll">
      {/* <ContinuousScroll /> */}
      <Scene />
      <div className="body">
        <h2 className='projects-header'>ProJecTs</h2>
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={{
              pathname: `/projects/${encodeURIComponent(project.slug)}`
            }}
          >
            <Project
              key={project.slug}
              index={index}
              title={project.title}
              desc={project.desc}
              setModal={setModal}
            />
          </Link>
        ))}
      </div>
      <Modal projects={projects} modal={modal} />
    </main>
  
  );
}
