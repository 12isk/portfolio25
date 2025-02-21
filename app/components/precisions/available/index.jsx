import React from 'react'

import styles from './styles.module.scss';

export default function Index({home}) {

const colors = ["#832388", "#e3436b", "#f0772f", "#33CCFF"];
const colors2 = [
    "#c32d27",
    "#f5c63f",
    "#457ec4",
    "356fdb"
]
const size = 10;

  return (
    <div className={home ? `${styles.avContainer} ${styles.avHome}` : styles.avContainer}>
        <div className={styles.diskContainer}>
            <div className={styles.diskWrapper}>
                {colors.map((color, i) => {
                    let newSize = size + i + 1;
                    
                    return (
                        <div key={i} className={styles.disk}
                         style={{ 
                            backgroundColor: color }}>

                        </div>
                    );
                })}
            </div>
        </div>
        
        <div className={styles.text}>Available in 2025</div>
      
    </div>
  )
}
