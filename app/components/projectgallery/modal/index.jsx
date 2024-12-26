import { cubicBezier, motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.scss';

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "60%" },
  open: { scale: 1, x: "-50%", y: "60%", 
    transition: { duration: 0.5, ease:[0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "50%", 
    transition: { duration: 0.8, ease:[0.76, 0, 0.24, 1] } },
};

export default function Modal({ modal, projects }) {
  const { active, index } = modal;
  const container = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  // Scroll position references
  const currentScroll = useRef(0); // Current lerped scroll
  const targetScroll = useRef(0); // Target scroll position

  const ease = 0.03; // Lerp easing factor


    // Handle scroll
  const manageScroll = () => {
    targetScroll.current = window.scrollY;
  };


  useEffect(() => {
    // Ensure initial scroll position is set
    //targetScroll.current = window.scrollY;
    currentScroll.current = 0;
  
    // Lerp function for smooth transitions (moved outside to ensure consistent definition)
    const lerp = (a, b, n) => a + (b - a) * n;
  
    // Initialize GSAP quick setters for performance
    const moveContainerX = gsap.quickTo(container.current, "left", {
      duration: 0.82,
      ease: "power3",
      xPercent: "-50%",
    });
    const moveContainerY = gsap.quickTo(container.current, "top", {
      duration: 0.82,
      ease: "power3",
      yPercent: "-50%",
    });
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 1,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 1,
      ease: "power3",
    });
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  
    // Animation frame tracking
    let animationFrameId;
  
    const animateFrame = () => {
      // Smoothly lerp the scroll position
      currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.05);
  
      // // Debug logging
      // console.log(`currentScroll is ${currentScroll.current}`);
      // console.log(`targetScroll is ${targetScroll.current}`);
      // console.log(`window.scrollY is ${window.scrollY}`);
  
      // Move container, cursor, and label
      moveContainerX(mouse.current.x);
      moveContainerY(lerp(mouse.current.y + currentScroll.current, mouse.current.y, 0.03));
      xMoveCursor(mouse.current.x);
      yMoveCursor(mouse.current.y + currentScroll.current);
      xMoveCursorLabel(mouse.current.x);
      yMoveCursorLabel(mouse.current.y);
  
      // Continue the animation loop
      animationFrameId = requestAnimationFrame(animateFrame);
    };
  
    // Handle mouse movement
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      //targetScroll.current = e.clientY;

    };
  
    // Handle scroll updates
    const handleScroll = () => {
      targetScroll.current = mouse.current.y;
    };
  
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
  
    // Start the animation loop
    animationFrameId = requestAnimationFrame(animateFrame);
  
    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
  
      // Cancel the animation frame if it exists
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  


  // useEffect(() => {
   
  
    
  
  //   // GSAP quick setters
  //   const moveContainerX = gsap.quickTo(container.current, "left", {
  //     duration: 0.82,
  //     ease: "power3",
  //     xPercent: "-50%",
  //   });
  //   const moveContainerY = gsap.quickTo(container.current, "top", {
  //     duration: 0.82,
  //     ease: "power3",
  //     yPercent: "-50%",
  //   });
  //   const xMoveCursor = gsap.quickTo(cursor.current, "left", {
  //     duration: 1,
  //     ease: "power3",
  //   });
  //   const yMoveCursor = gsap.quickTo(cursor.current, "top", {
  //     duration: 1,
  //     ease: "power3",
  //   });
  //   const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
  //     duration: 0.45,
  //     ease: "power3",
  //   });
  //   const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
  //     duration: 0.45,
  //     ease: "power3",
  //   });
  
  //   const animateFrame = () => {
  //     // Calculate the scroll delta
  //     const deltaScroll = scrollPositions.current[1] - scrollPositions.current[0];
  
  //     // Smoothly lerp the deltaScroll value
  //     const lerpedDeltaScroll = lerp(0, deltaScroll, ease);
  
  //     // Move elements
  //     moveContainerX(mouse.current.x);
  //     moveContainerY(mouse.current.y + lerpedDeltaScroll);
  //     xMoveCursor(mouse.current.x);
  //     yMoveCursor(mouse.current.y + lerpedDeltaScroll);
  //     xMoveCursorLabel(mouse.current.x);
  //     yMoveCursorLabel(mouse.current.y);
  
  //     // Request next frame
  //     requestAnimationFrame(animateFrame);
  //   };
  
  //   const handleMouseMove = (e) => {
  //     mouse.current = { x: e.clientX, y: e.clientY };
  //   };
  
  //   const manageScroll = () => {
  //     // Update scroll positions and calculate delta
  //     const currentScroll = window.scrollY;
  //     scrollPositions.current = [scrollPositions.current[1], currentScroll];
  //   };
  
  //   // Add event listeners
  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("scroll", manageScroll);
  
  //   // Start animation loop
  //   requestAnimationFrame(animateFrame);
  
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("scroll", manageScroll);
  //   };
  // }, []);
  
  

  //stops working after hover more than 1sec
  // useEffect(() => {
  //   const handleScroll = () => {
  //     targetScroll.current = window.scrollY; // Update target scroll position
  //   };
  
  //   const handleMouseMove = (e) => {
  //     const { clientX, clientY } = e;
  //     mouse.current = { x: clientX, y: clientY }; // Update current mouse position
  //   };
  
  //   const animate = () => {
  //     if ( active) {
        
  //     }
  //     // Lerp scroll position
  //     currentScroll.current = lerp(currentScroll.current, targetScroll.current, ease);
  
  //     // Lerp mouse position
  //     delayedMouse.current = {
  //       x: mouse.current.x,
  //       y: lerp(delayedMouse.current.y, mouse.current.y + currentScroll.current, ease),
  //     };
  
  //     // Move the container
  //     if (container.current) {
  //       gsap.set(container.current, {
  //         left: delayedMouse.current.x,
  //         top: delayedMouse.current.y,
  //         xPercent: -50,
  //         yPercent: -50,
  //       });
  //     }
  
  //     // Move the cursor
  //     if (cursor.current) {
  //       gsap.set(cursor.current, {
  //         left: delayedMouse.current.x,
  //         top: delayedMouse.current.y,
  //         xPercent: -50,
  //         yPercent: -50,
  //       });
  //     }
  
  //     // Move the cursor label
  //     if (cursorLabel.current) {
  //       gsap.set(cursorLabel.current, {
  //         x: delayedMouse.current.x,
  //         y: delayedMouse.current.y,
  //       });
  //     }
  
  //     // Continue the animation loop
  //     requestAnimationFrame(animate);
  //   };
  
  //   // Add event listeners
  //   window.addEventListener("mousemove", handleMouseMove);
  //   window.addEventListener("scroll", handleScroll);
  
  //   // Start the animation loop
  //   animate();
  
  //   return () => {
  //     // Cleanup event listeners
  //     window.removeEventListener("mousemove", handleMouseMove);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  


 

//   useEffect(() => {

//     // Smoothly lerp the scroll position
//     currentScroll.current = lerp(currentScroll.current, targetScroll.current, ease);
//     console.log(`currentScroll is ${currentScroll.current}`);
//     const moveContainerX = gsap.quickTo(container.current, "left", { duration: 0.82, ease: "power3", xPercent: "-50%" });
//     const moveContainerY = gsap.quickTo(container.current, "top", { duration: 0.82, ease: "power3", yPercent: "-50%" });
//     // Move cursor 
//     let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 1, ease: "power3" });
//     let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 1, ease: "power3" });
//     // Move cursor label
//     let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
//     let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });
    
//     console.log(`index is ${index}`);

//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;
//       moveContainerX(clientX);
//       moveContainerY(clientY+currentScroll.current);
//       xMoveCursor(clientX);
//       yMoveCursor(clientY+currentScroll.current);
//       xMoveCursorLabel(clientX);
//       yMoveCursorLabel(clientY);
//     };
// // TODO: fix follow cursor, when scroll, lost
// // TODO: implement getting scroll pos or wtv i cant think anymore
//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("scroll", manageScroll);
    
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("scroll", manageScroll);
//     };
//   }, []);

    // Lerp function
    const lerp = (a, b, n) => (1 - n) * a + n * b;

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
