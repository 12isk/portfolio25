"use client";
import React, {useRef, useEffect} from 'react'
import { useScroll, motion } from 'framer-motion'

import styles from '../styles.module.scss'
export default function Paragraph({value}) {
  
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.4']
    });

    // useEffect(() => {  
    //     scrollYProgress.on('change', e => console.log(e));
    // }, []);


  return (
    <motion.p className={styles.paragraph} 
        ref={element}
        style={{opacity: scrollYProgress}}
    >
        {value}
      </motion.p>
  )
}
