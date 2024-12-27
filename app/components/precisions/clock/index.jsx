import React from 'react';
import Clock from 'react-live-clock';
import styles from './styles.module.scss';

export default function index() {
    const colors = ["#3FFF00", "#00FFBF"]
    const size = 10;

  return (
    <div className={styles.clockContainer}>
        <span className={styles.lv1}>Currently in Lyon<span className={styles.location}>, France</span></span>
        <div className={styles.wrap}>
            <Clock className={styles.clock} format={'HH:mm:ss'} ticking={true} timezone={'Europe/Paris'} />
        {/* <div className={styles.diskContainer}>
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
        </div> */}
        </div>
        
      
    </div>
  )
}
