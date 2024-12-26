import { motion, useScroll, useTransform, useSpring, animate } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Available from '../available';
import useIsMobile from '../hooks/useIsMobile';
import styles from './styles.module.scss';

export default function Contact() {
    const mail = "contact@12isk.xyz";
    const isMobile = useIsMobile();
    
    const container = useRef(null);
    const text = useRef(null);
    const letterR = useRef(null);
    const at = useRef(null);
    const insta = useRef(null);
    const mailLink = useRef(null);

    const [isScrolling, setIsScrolling] = useState(false);
    let scrollTimeout;

    const { scrollYProgress } = useScroll({
        target: container,
        offset: isMobile ? 
            ['start 0.9', 'end 0.9'] : 
            ['0.1 end', 'end end']
    });

    // Add spring physics for smoother animations
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 20,
        stiffness: 100,
        mass: 0.5
    });
    

    // Original parallax animations
    const small = useTransform(smoothProgress, [0, 1], [-75, 0]);
    const medium = useTransform(smoothProgress, [0, 1], [-100, 0]);
    const invMedium = useTransform(smoothProgress, [0, 1], [100, 0]);
    const large = useTransform(smoothProgress, [0, 1], [-150, 0]);
    const rotation = useTransform(smoothProgress, [0, 1], [360, 0]);

    // Magnetic scroll effect
    useEffect(() => {
        const handleScrollEnd = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                if (!container.current) return;
                
                const rect = container.current.getBoundingClientRect();
                const containerTop = rect.top;
                const windowHeight = window.innerHeight;
                
                // Calculate how visible the container is
                const visiblePercentage = 1 - (Math.abs(containerTop) / windowHeight);
                
                if (visiblePercentage > 0.2) {
                    // If container is more than 30% visible, snap to it
                    const targetScroll = window.scrollY + containerTop;
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }
            }, 150);
        };

        const handleScroll = () => {
            setIsScrolling(true);
            handleScrollEnd();
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, []);

    return (
        <div ref={container} className={styles.aboutContainer} id="contact">
            <Available />
            
            <div className={styles.socials}>
                <motion.a 
                    style={{ y: small }} 
                    ref={insta} 
                    href="https://instagram.com/twelveisk"
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