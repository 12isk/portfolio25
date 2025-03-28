import React from 'react'

import useIsMobile from '../../hooks/useIsMobile';
import styles from './styles.module.scss';

export default function Index() {
  const isMobile = useIsMobile();
  return (
    <div className={styles.specialty}>
      <span className={styles.lv1}>Creative Developper</span>
      <span className={styles.lv2}>Specialized in Graphic {isMobile ? null : "Design" } </span>
      <span className={styles.lv2}>{isMobile ? "Design" : null} <span className={styles.and}>&</span> Web Dev  </span>
    </div>
  )
}
