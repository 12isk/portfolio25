"use client";
import React, {useRef, useEffect} from 'react'
import { useScroll, motion, useTransform, useSpring } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile';

import styles from '../styles.module.scss'



export default function Paragraph({value}) {
  
    const element = useRef(null);
    const isMobile = useIsMobile();
    const { scrollYProgress } = isMobile ? 
        useScroll({
          target: element,
          offset: ['start 0.9', 'end 0.9']
        }) :  useScroll({
        target: element,
        offset: ['start end', '0.2 0.6']
    });

    const smoothProgress = useSpring(scrollYProgress, {
      damping: 10,
      stiffness: 35,
      mass: 0.1,
    });

    // useEffect(() => {  
    //     scrollYProgress.on('change', e => console.log(e));
    // }, []);

    const words = value.split(" ");
    return (
        <p className={styles.paragraph} 
            ref={element}
            style={{opacity: smoothProgress}}
        >
        { words.map((word, index) => {
            const start = (index / words.length); // Multiply by 0.5 to stretch the range
            const end = start + (1 / words.length); // Add 0.5 to extend the fade-in
            //.log([start, end]);
            return <Word word={word} range={[start,end]} progress={smoothProgress} index={index} key={index} >
                {word}</Word>;
        })}
        </p>
    )
}


const Word = ({ word, index, range, progress }) => {
    const opacity = useTransform(progress, range, [0, 1]);

  if (word === "iBrAhiMa") {
    return (
      <motion.span 
            style={{opacity}}
            className={`${styles.ibrahima} 
            ${styles.word}`} 
            key={index}>
        {word}
      </motion.span>
    );
  } else if (word === "love") {
    return (
      <motion.span 
        style={{opacity, color: "#e3436b"}}
        className={`${styles.love} ${styles.word}`}
        key={index}
      >
        LOVE<sup>&#x2767;</sup>
      </motion.span>
    );
  } else if (word === "br"){
    return <br key={index} />;
  } else{
    return (
      <motion.span 
        style={{opacity}} className={styles.word} key={index}>
        {word}
      </motion.span>
    );
  }
};
