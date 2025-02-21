import React from 'react';
import Clock from 'react-live-clock';

import useIsMobile from '../../hooks/useIsMobile';
import styles from './styles.module.scss';

// JSX
export default function Index() {
    const colors = ["#3FFF00", "#00FFBF"]
    const size = 10;
    const isMobile = useIsMobile();

  return (
    <div className={styles.clockContainer}>
        <span className={styles.lv1}>Currently in <span className={styles.location}>{isMobile ? <span className={styles.France}> Lyon, France</span> : "Lyon, France"} </span></span>
        <div className={styles.wrap}>
            <div className={styles.diskContainer}>
                <div className={styles.diskWrapper}>
                    {colors.map((color, i) => {
                        let newSize = size + i + 1;                    
                        return (
                            <div key={i} className={styles.disk}
                             style={{ 
                                backgroundColor: color,
                                width: newSize,
                                height: newSize}}>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Clock className={styles.clock} format={'HH:mm:ss'} ticking={true} timezone={'Europe/Paris'} />

        </div>
    </div>
  )
}
