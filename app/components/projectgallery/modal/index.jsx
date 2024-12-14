import { cubicBezier, motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "60%" },
  open: { scale: 1, x: "-50%", y: "60%", 
    transition: { duration: 0.5, ease:[0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "50%", 
    transition: { duration: 0.8, ease:[0.76, 0, 0.24, 1] } },
};
//todo: fix index not updating

export default function Modal({ modal, projects }) {
  const { active, index } = modal;
  const container = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    const moveContainerX = gsap.quickTo(container.current, "left", { duration: 0.82, ease: "power3", xPercent: "-50%" });
    const moveContainerY = gsap.quickTo(container.current, "top", { duration: 0.82, ease: "power3", yPercent: "-50%" });
    // Move cursor 
    let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 1, ease: "power3" });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 1, ease: "power3" });
    // Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });
    
    console.log(`index is ${index}`);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      moveContainerX(clientX);
      moveContainerY(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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
