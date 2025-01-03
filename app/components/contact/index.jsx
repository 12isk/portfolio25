import { useLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

import Available from '../precisions/available';
import useIsMobile from '../hooks/useIsMobile';
import styles from './styles.module.scss';



const INSTA = "https://instagram.com/twelveisk";

function easeInOutExpo(x) {
    if (x === 0) return 0;
    if (x === 1) return 1;
  
    if (x < 0.5) {
      return Math.pow(2, 20 * x - 10) / 2;
    } else {
      return (2 - Math.pow(2, -20 * x + 10)) / 2;
    }
  }

  function easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    
    if (x < 1 / d1) {
        return n1 * x * x;
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
    }
  
    // Check easing for changes:
    // Sizes
    // Positions
    // Transparencies
    // This function:
    // This function
    // Linear function:
    // Linear function
    

export default function Contact({lenis}) {
    const mail = "contact@12isk.xyz";
    const isMobile = useIsMobile();
    
    const container = useRef(null);
    const text = useRef(null);
    const letterR = useRef(null);
    const at = useRef(null);
    const insta = useRef(null);
    const mailLink = useRef(null);
    
    //const lenis = useLenis();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: isMobile ? 
            ['start 0.9', 'end 0.9'] : 
            ['0.1 end', '0.9` end']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        damping: 20,
        stiffness: 100,
        mass: 0.5
    });

    const small = useTransform(smoothProgress, [0, 1], [-75, 0]);
    const medium = useTransform(smoothProgress, [0, 1], [-100, 0]);
    const invMedium = useTransform(smoothProgress, [0, 1], [100, 0]);
    const large = useTransform(smoothProgress, [0, 1], [-150, 0]);
    const rotation = useTransform(smoothProgress, [0, 1], [360, 0]);

    useEffect(() => {
        if (!lenis) return;

        let isScrolling = false;
        
        const handleScrollEnd = () => {
            if (!container.current) return;
            
            const rect = container.current.getBoundingClientRect();
            const containerTop = rect.top;
            const windowHeight = window.innerHeight;
            const visiblePercentage = 1 - (Math.abs(containerTop) / windowHeight);
            
            if (visiblePercentage >= 0.12) {
                const targetScroll = lenis.scroll + containerTop;
                lenis.scrollTo(targetScroll, {
                    duration: 1.2,
                    durationMultiplier: 1.3,
                    easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x))
                });
            }
        };

        const onScroll = () => {
            if (!isScrolling) {
                isScrolling = true;
            }
            
            // Clear any existing timeouts
            window.clearTimeout(window.scrollTimeout);
            
            // Set new timeout
            window.scrollTimeout = window.setTimeout(() => {
                isScrolling = false;
                handleScrollEnd();
            }, 50); // Reduced timeout for faster response
        };

        lenis.on('scroll', onScroll);

        return () => {
            window.clearTimeout(window.scrollTimeout);
            lenis.off('scroll', onScroll);
        };
    }, [lenis]);

    return (
        <div ref={container} className={styles.aboutContainer}>
            <Available />
            
            <div className={styles.socials}>
                <motion.a 
                    style={{ y: small }} 
                    ref={insta} 
                    href={INSTA}
                >
                    [instagram]
                </motion.a>
            </div>

            <motion.div 
                style={{ y: small }} 
                ref={text} 
                className={styles.textWrapper}
            >
                <motion.p style={{ y: small }} className={styles.text}>
                    <motion.span 
                        style={{ y: large }} 
                        ref={letterR} 
                        className={styles.firstLetter}
                    >
                        R
                    </motion.span>
                    eady for more?<br/>
                    <motion.span className={styles.newLine}>
                        Reach me
                        <motion.span 
                            style={{ y: medium, rotate: rotation }} 
                            ref={at} 
                            className={styles.at}
                        >
                            @
                        </motion.span>
                    </motion.span>
                </motion.p>
            </motion.div>

            <motion.div 
                style={{ y: small }} 
                ref={mailLink} 
                className={styles.mail}
            >
                <a className={styles.mailLink} href={`mailto:${mail}`}>
                    {mail}
                </a>
            </motion.div>
        </div>
    );
}