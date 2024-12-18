"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, use } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap-trial/dist/ScrollTrigger';
import { ScrollSmoother } from 'gsap-trial/dist/ScrollSmoother';

import ProjectPage from './components/ProjectPage';
import Project from './components/projectgallery/project';
import Modal from './components/projectgallery/modal';

// Import the projects JSON file
import projects from "./data/projects.json";
import { Scroll } from '@react-three/drei';

const Scene = dynamic(() => import('./components/Presentation'), {
  ssr: false // Ensure server-side rendering is disabled for dynamic import
});

export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const mainRef = useRef(null);

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother = ScrollSmoother.create({
      wrapper: mainRef.current,
      content: "#smooth-content", // The ID of the content element
      smooth: .8,
    });
  }, []);

  return (
  
    <main ref ={mainRef} className="relative h-screen overflow-y-scroll">
      <div id="smooth-content">
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
      </div>
    </main>
  
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                