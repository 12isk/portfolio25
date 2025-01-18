import React, { useRef } from 'react'
import { useScroll, motion, useSpring } from 'framer-motion'
import styles from '../styles.module.scss'

export default function Line({ text }) {
    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.9', 'start 0.4']
    });
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 10,
        stiffness: 35,
        mass: 0.1,
    });

    const lines = text.split("\n");
    return (
        <div>
            <p className={styles.paragraph}
                ref={element}
                style={{ opacity: smoothProgress }}
            >
                {lines.map((line, index) => {
                    
                    if (index === 0) {
                        return (
                            <motion.span
                                style={{ opacity: smoothProgress }}
                                key={index}
                            >
                                {line.split("that").map((word, wordIndex) => (
                                    <span key={wordIndex} className={styles.strikethrough}>{word}</span>
                                ))}
                            </motion.span>
                        );
                    } else {
                        return (
                            <motion.span
                                style={{ opacity: smoothProgress }}
                                key={index}
                            >
                                {line}
                            </motion.span>
                        );
                    }
                })}
            </p>
        </div>
    )
}


