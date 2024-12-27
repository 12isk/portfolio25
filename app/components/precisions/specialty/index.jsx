import React from 'react'
import styles from './styles.module.scss';

export default function index() {
  return (
    <div className={styles.specialty}>
      <span className={styles.lv1}>All Around Creative</span>
      <span className={styles.lv2}>Specialized in Graphic Design </span>
      <span className={styles.lv2}> <span className={styles.and}>&</span> Web Dev  </span>
    </div>
  )
}
