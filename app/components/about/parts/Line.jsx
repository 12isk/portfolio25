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
    // useEffect(() => {
    //     console.log(lines);
    // }, [lines]);
    return (
      <div className={styles.paragraph} ref={element}>
          {lines.map((line, lineIndex) => {
              const start = lineIndex / lines.length;
              const end = start + (1 / lines.length);
              
              // Create a unique wrapper for each line and its line break
              return (
                  <div key={`line-wrapper-${lineIndex}`}>
                      <Line 
                          words={line.split('')}
                          range={[start, end]}
                          progress={smoothProgress}
                      />
                      {lineIndex < lines.length - 1 && (
                          <span className={styles.newLine} />
                      )}
                  </div>
              );
          })}
      </div>
  );
}

const Line = ({ words, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
      <motion.span style={{ opacity }} className="">
          {words.map((word, index) => (
              <Word 
                  key={`word-${index}`} 
                  word={word} 
              />
          ))}
      </motion.span>
  );
};

const Word = ({ word }) => {
  const isUpperCase = word[0]?.match(/[A-Z]/) && word[0]?.toUpperCase() === word[0];
  
  return (
      <span className={isUpperCase ? styles.upper : undefined}>
          {word}
      </span>
  );
};