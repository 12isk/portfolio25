import React from 'react'
import { useState } from 'react' ;
import Project from './projectgallery/project';

const projects = [
  {
    title: 'Existence Magazine',
    src: ['/projects/existence/flyer_b.png', '/projects/existence/flyer_w.png'],
    color: '#f00',
  },
  {
    title: 'Gryse Giveaway',
    src: '/projects/giveaway.png',
    color: '#f00',
  },
  {
    title: '(re)generation',
    src: 'xx.png',
    color: '#f00',
  },
  {
    title: '(unsolicited) statements',
    src: 'xx.png',
    color: '#f00',
  },

];

export default function ProjectPage() {
  
  const [modal, setModal] = useState({active: false, index: 0})



  return (

  <main className={styles.main}>

    <div className={styles.body}>

      {

        projects.map( (project, index) => {

          return <Project index={index} title={project.title} setModal={setModal} key={index}/>

        })

      }

    </div>

    <Modal modal={modal} projects={projects}/>

  </main>

  )

}

