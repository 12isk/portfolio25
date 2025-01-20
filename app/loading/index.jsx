"use client";
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { motion, AnimatePresence } from 'framer-motion';

const popAnim = {
  initial: {
    scaleY: 0,
  },
  open: {
    scaleY: 1,
    transition: { duration: 1, ease:[0.87, 0, 0.13, 1] },
  },
  closed: {
    scaleY: 1,
  },
};

const anim = {
  initial: {
    opacity: 1,
  },
  open: {
    opacity: 1,
    y: '100%', // Slide out to the top
    transition: { duration: 1, ease:[0.76, 0, 0.24, 1] },
  },
  closed: {
    opacity: 1,
  },
};

export default function Index({ progress }) {
  const [done, setDone] = useState(false);
  const colors = ["#832388", "#e3436b", "#f0772f", "#33CCFF"];

  useEffect(() => {
    if (progress === 100) {
      setDone(true);
    }
  }, [progress]);

    return (
      <AnimatePresence>
        <motion.div className={styles.preloader} variants={anim}
          initial="initial"
          animate={done ? "open" : "closed"}
          exit="closed"
        >
          <motion.div variants={popAnim}
            initial="initial"
            animate={done ? "open" : "closed"}
            className={styles.counter}
          >
            {progress}<span className={styles.percent}>%</span>
            {/* {colors.map((color, i) => (
              <span
              className={styles.percent}
              style={{
                zIndex: 4 - i,
                position: 'absolute',
                top: '-30%',
                // left: 0,
                transform: `translate(${i * 2}px, ${i * 2}px)`, // Adjust offsets for layering
                // opacity: 1 - i * 0.2, // Gradually reduce opacity for depth effect
                color: color,
                filter: `blur(${5}px)`,
                //mixBlendMode: 'difference',
              }}
              key={i}
            >
              %
            </span> 
            ))}*/}
          </motion.div>
        </motion.div>
      </AnimatePresence>
  );
}
