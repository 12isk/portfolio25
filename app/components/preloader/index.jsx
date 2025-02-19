"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

import { motion, AnimatePresence, animate } from "framer-motion";
import { Html } from "@react-three/drei"; // Import Html from drei
import { animatePageIn } from "@/app/utils/animations";

const popAnim = {
  initial: { scaleY: 0 },
  open: { scaleY: 1, transition: { duration: 1, ease: [0.87, 0, 0.13, 1] } },
  closed: { scaleY: 1 },
};

// const anim = {
//   initial: { opacity: 1 },
//   open: {
//     opacity: 1,
//     y: "100%",
//     transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
//   },
//   closed: { opacity: 0 },
// };

const anim = {
  initial: {
    opacity: 1,
    x: 0
  },
  open: {
    opacity: 0,
    x: '-100%',
    transition: { 
      duration: 1.5,
      ease: [0.76, 0, 0.24, 1],
      opacity: {
        duration: 0.8
      }
    }
  },
  closed: {
    opacity: 1,
    x: 0
  }
};

export default function Preloader({ progress }) {
  const [done, setDone] = useState(false);


  
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setDone(true);
      }, 500);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      <Html center>
        {/* Use Html to position content */}
    
        <motion.div
          className={styles.preloader}
          variants={anim}
          initial="initial"
          animate={done ? "open" : "closed"}
          exit="closed"
        >
          <motion.div
            variants={popAnim}
            initial="initial"
            animate={done ? "open" : "closed"}
            className={styles.counter}
          >
            {progress}
            <span className={styles.percent}>%</span>
          </motion.div>
        </motion.div>
      </Html>
    </AnimatePresence>
  );
}
