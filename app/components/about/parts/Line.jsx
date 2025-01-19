import React, { useEffect, useRef } from 'react'
import { useScroll, motion, useSpring, useTransform } from 'framer-motion'
import styles from '../styles.module.scss'

export default function Paragraph({ text }) {
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
    useEffect(() => {
        console.log(lines);
    }, [lines]);
    return (
        <div className={styles.paragraph} ref={element}>
            {lines.map((line, lineIndex) => {
            // Calculate opacity range for each line
            const start = lineIndex / lines.length;
            const end = start + (1 / lines.length);
            
            // if (lineIndex === 0 ){
            //     let parts = line.split("that");
            //     return(
            //         <>
            //         <span className={styles.slike}>{parts[0]}</span>
            //         {/* {parts=parts.slice(1)} */}
            //         <Line 
            //         key={lineIndex}
            //         words={parts.slice(1).join(' ').split('') }
            //         range={[start, end]}
            //         progress={smoothProgress}
            //         />
            //         </>
            //     )
            // } 
            // else return (
            //if (line === "\n") return <br className={styles.newLine} key={lineIndex} />;
            //else
            return(
                <>
                <Line 
                key={lineIndex}
                words={line.split('')}
                range={[start, end]}
                progress={smoothProgress}
                />
                <span className={styles.newLine} key={lineIndex} />
                </>
            );
            })}
        </div>
        );
    };

const Line = ({ words, range, progress }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    
    return (
      <motion.span 
        style={{ opacity }} 
        className=""
      >
        {words.map((word, index) => (
          <Word 
            key={index} 
            word={word} 
          />
        ))}
      </motion.span>
    );
  };
  
  const Word = ({ word }) => {
    
    if ( word[0].match(/[A-Z]/) && word[0].toUpperCase() === word[0] ){
      return (
        <span className={styles.upper}>
          {word}
        </span>
      );
    } else
      return (
        <span >
          {word}
        </span>
      );
    
  };
