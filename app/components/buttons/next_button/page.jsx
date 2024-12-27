'use client'; // This ensures that this code runs only on the client side

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';
import projects from '../../../data/projects.json'; // Update the import statement

const NextButton = ({ label = "Go Forward", project }) => {
  const router = useRouter();

  const handleClick = () => {
    if (project !== undefined) {
      const currentId = project.id;
      const nextId = (currentId % projects.length) + 1; // Ensure the next ID is within bounds
      const nextProject = projects.find(p => p.id === nextId);
      if (nextProject) {
        console.log(`Navigating to the next project: ${nextProject.slug}`);
        router.push(`/projects/${nextProject.slug}`);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.returnButton}
      aria-label={label}
    >
      <Image
        src="../../icons/next_btn.svg"
        alt="Return"
        width={48}
        height={48}
        style={{ width: "48px", height: "48px", marginRight: "8px", padding: "10px" }}
      />
    </button>
  );
};

export default NextButton;
