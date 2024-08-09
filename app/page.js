"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react' ;

import ContinuousScroll from './components/ContinuousScroll';
import ProjectPage from './components/ProjectPage';
import Project from './components/Project';
import Modal from './components/Modal';
import gsap from 'gsap';


const Scene = dynamic(() => import('./components/Presentation'), {
  ssr: false // Ensure server-side rendering is disabled for dynamic import
});

export default function Home() {

  const projects = [
    {
      title: 'Existence Magazine',
      src: 'projects/existence/prev_f-w.png',
      color: '#81D8D0',
      desc:"Graphic Design, 3D Modeling",
    },
    {
      title: 'Gryse Giveaway',
      src: 'projects/gryse/giveaway.png',
      color: '#f0772f',
      desc:"Graphic Design",
    },
    {
      title: '(re)generation',
      src: '/projects/regen/falling.png',
      color: '#e3436b',
      desc:"Graphic Design",
    },
    {
      title: '(unsolicited) statements',
      src: '/projects/statements/statement1.png',
      color: '#daa661',
      desc:"Graphic Design",
    },

  ];
  
  const [modal, setModal] = useState({active: false, index: 0});
 

  return (
    <main className="relative h-screen overflow-y-scroll">
      {/* <ContinuousScroll /> */}
      <Scene />
      <div className="body">
        {
          projects.map( (project, index) => {
            return <Project key={index} index={index} title={project.title} desc={project.desc} setModal={setModal}/>
          }
        )}
      
      </div> 
      <Modal projects={projects} modal={modal}/>
    </main>
  );
}