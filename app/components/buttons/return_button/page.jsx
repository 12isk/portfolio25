'use client'; // This ensures that this code runs only on the client side

import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './styles.module.scss';



const ReturnButton = ({ label = "Go Back" }) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("Navigating back to the previous page");
    router.back(); // Navigate back to the previous page

  };

 return (
    <button
      onClick={handleClick}
      className={styles.returnButton}
      aria-label={label}
    >
      <img
        src="../../icons/return.svg"
        alt="Return"
        style={{ width: "48px", height: "48px", marginRight: "8px",
          padding: "10px" }}
      />
    </button>
  );
};

export default ReturnButton;
