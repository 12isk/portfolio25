import { gsap } from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "60%" },
  open: { scale: 1, x: "-50%", y: "60%",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "50%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
};

export default function Modal({ modal, projects }) {
  const { active, index } = modal;
  const container = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  // Track mouse position
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  // Track scroll position
  const [scrollPos, setScrollPos] = useState(0);

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.current = {
      x: clientX,
      y: clientY
    };
  };

  const manageScroll = () => {
    setScrollPos(window.scrollY);
  };

  // Linear interpolation for the modal
  const lerp = (a, b, n) => (1 - n) * a + n * b;

  const moveContainer = (x, y) => {
    if (container.current) {
      gsap.set(container.current, { x, y, xPercent: -50, yPercent: -50 });
    }
  };

  const ease = 0.03;

  const animate = () => {
    const { x, y } = delayedMouse.current;
    delayedMouse.current = {
      x: lerp(x, mouse.current.x, ease),
      y: lerp(y, mouse.current.y + scrollPos * 0.2, ease)
    };

    moveContainer(delayedMouse.current.x, delayedMouse.current.y);
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    window.addEventListener('mousemove', manageMouseMove);
    window.addEventListener('scroll', manageScroll);
    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
      window.removeEventListener('scroll', manageScroll);
    };
  }, [scrollPos]);

  return (
    <>
      <motion.div ref={container} variants={scaleAnimation} initial="initial" animate={active ? "open" : "closed"} className={styles.modalContainer}>
        <div style={{ top: index * -100 + "%" }} className={styles.modalSlider}>
          {
            projects.map((project, idx) => {
              const { src, color, title } = project;
              return (
                <div className={styles.modal} style={{backgroundColor: color}} key={idx}>
                  <div className={styles.modalContent}>
                    <Image
                      src={src[0]} // Assuming src is an array of image paths
                      alt={title} // Assuming title is a property of project
                      width={300}
                      height={200} // Set a proper height value
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>
      <motion.div variants={scaleAnimation} initial="initial" animate={active ? "open" : "closed"} ref={cursor} className={styles.cursor} />
      <motion.div variants={scaleAnimation} initial="initial" animate={active ? "open" : "closed"} ref={cursorLabel} className={styles.cursorLabel}>
        View
      </motion.div>
    </>
  );
}
