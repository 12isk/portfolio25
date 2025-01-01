"use client";

import Link from 'next/link'
import GradientCursor from './components/GradientCursor'
import styles from './css/404/styles.module.scss'
import { motion } from 'framer-motion'
 
export default function NotFound() {

  function easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

  const bounceUp = {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: easeOutElastic
      }
    }
  }

  const opacityAndScale = {
    initial: {
      opacity: 0,
      scale: 0
    },
    animate: {
      opacity: 1,
      scale: 1.2,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  const opacity = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }




  return (
    <div className={styles.container}>
      <GradientCursor/>
      
      <motion.h1 variants={bounceUp} initial="initial" animate="animate"  className={styles.code}>
        4<span className={styles.zero}>O</span>4
      </motion.h1>
      <motion.h2 className={styles.yap} variants={opacity} initial="initial" animate="animate">
        Couldn't quite find the way there <span className={styles.sad}>:(</span>
      </motion.h2>
      
      <motion.div className={styles.homeBtn} variants={opacityAndScale} initial="initial" animate="animate" >
      <Link  href="/">Return Home &#8599;</Link>

      </motion.div>
    </div>
  )
}