import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export default function ImageFocus({src}) {
    
  const [shown, setShown] = useState(false);
  
  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "60%"  },
    open: { scale: 1, x: "0%", y: "0%",
      transition: { duration: 0.4, ease:[0.76, 0, 0.24, 1] } },
    closed: { scale: 0, 
      transition: { duration: 0.3, ease:[0.76, 0, 0.24, 1] } },
  };

  useEffect(() => {
    setShown(src != null);
  }, [src])

  const closeFocus = () => {
      setShown(false);
  }

  //TODO: await image focus before blurring bg
    
  return (
    <>
    <motion.div style={{display: shown ? 'flex' : 'none'}} variants={scaleAnimation} initial="initial" animate={shown ? "open" : "closed"} className={styles.imageFocus}>
      <Image
        
        className={styles.image} 
        src={`/${src}`} 
        //layout="fill"
        objectFit="contain"
        width={400}
        height={500}
        alt="focus image"
      />
     <div className={styles.menuCloseIcon} onClick={closeFocus}>
        <p className={styles.closeIcon} >
        &#x2715;
        </p>
      </div>
    </motion.div>
   
    </>

  )
}
