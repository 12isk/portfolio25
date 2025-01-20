"use client";
import React, { useRef, useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring, useInView } from 'framer-motion';
import styles from './styles.module.scss';
import Paragraph from './parts/Paragraph';
import Word from './parts/Word';
import Showreel from '../Showreel';
import useIsMobile from '../hooks/useIsMobile';
import textData from './text.json'
import Line from './parts/Line';
const paragraph2 = "My name is iBrAhima and as You've seen, i'm an all around creative! I loVe MakinG aLl sorts of viSual CrEaTiOnS and tell stories with them. i alsO reaaaally like textures !! I'd love to help you bring your vision to liFe! br AlsO Did I mention I LOOOOVE TexTUreS?";
const paragraph = "The most important thing you need to know about me is that I can craft a path for your art to be seen.\n I am Ibrahima, an aspiring graphic designer passionate about turning ideas into impactful visuals.\nAs I embark on this journey, I strive to create designs that inspire, resonate, and leave a lasting impression.\n Dedicated to honing my craft, let me help bring your vision to life as where creativity meets purpose, great design happens.";

export default function Index() {
  const title = useRef(null);
  const preview1 = useRef(null);
  const preview2 = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } =
    useScroll({
      target: title,
      offset: isMobile ? ['start 0.9', 'start 0.4'] :['start end', 'start 0.6']
    });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 5,
    stiffness: 35,
    mass: 0.1,
  });

 

  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]); // small med large
  // Start from higher positions and move to the CSS-defined positions
  const titleSpeed = useTransform(smoothProgress, [0, 1], [-150, 0]); // Will move up to CSS top: 10%
  const preview1Y = useTransform(smoothProgress, [0, 1], [-200, 0]); // Will move up to CSS top: 10%
  const preview2Y = useTransform(smoothProgress, [0, 1], [-300, 0]);
  const par = useTransform(smoothProgress, [0, 1], [0, 50]);



  const isInView = useInView(title, { once: true });

  return (
    <div ref={title} id="#about" className={styles.main}>
      {/* <div style={{height:"100vh"}}></div> */}
      <motion.h1
        style={{ opacity: isInView ? 1 : 0, y: isInView ? titleSpeed : 0 }}
        className={styles.title}
      >
        <span className={styles.firstLetter}>A</span>bout
      </motion.h1>

      <motion.div style={{ top: isInView ? par : 0 }} className="div">
        <Line text={paragraph} />
      </motion.div>

      <motion.div
        ref={preview1}
        className={styles.preview}
        style={{ y: isInView ? preview1Y : 0 }}
      >
        <Showreel />
      </motion.div>
      <motion.div
        ref={preview2}
        className={styles.preview2}
        style={{ y: isInView ? preview2Y : 0 }}
      >
        <Showreel format="4x5" />
      </motion.div>
      {/* <div style={{height:"20vh"}}></div> */}
    </div>
  );
}
