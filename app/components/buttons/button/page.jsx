"use client";
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button className={styles.backButton} onClick={handleClick}>
      &lt;
    </button>
  );
};

export default BackButton;
