import React, { useRef } from 'react';
import { useTransform, useScroll, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Project from './project';
import styles from './styles.module.scss';
import useIsMobile from '../hooks/useIsMobile';

export default function ProjectList({ projects, setModal }) {
  const sLetter = useRef(null);
  const title = useRef(null);
  const mainRef = useRef(null);
  const bodyRef = useRef(null);
  
  const isMobile = useIsMobile();
  const isInView = useInView(mainRef, {
    margin: "-20% 0px -20% 0px",
    once: false // Set to true if you want the animation to only play once
  });

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ['start 0.9', 'start 0.4']
  });

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: isMobile ? 500 : -50 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const bodyVariants = {
    hidden: { 
      opacity: 0,
      y: -225 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.div 
      ref={mainRef} 
      id="projects"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h2 
        ref={title} 
        className='projects-header'
        variants={titleVariants}
      >
        ProJec<span ref={sLetter} className={styles.specialLetter}>T</span>s
      </motion.h2>

      <motion.div 
        ref={bodyRef}
        variants={bodyVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            variants={projectVariants}
          >
            <Link
              href={{
                pathname: `/projects/${encodeURIComponent(project.slug)}`
              }}
            >
              <Project
                index={index}
                title={project.title}
                desc={project.desc}
                setModal={setModal}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}