import ReturnButton from '@/app/components/buttons/return_button/page';
import FocusGallery from '@/app/components/focusgallery';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import projects from "@/app/data/projects.json";
import styles from './styles.module.scss';
import NextButton from '@/app/components/buttons/next_button/page';

export default function Focus({ params }) {
  if (!params || !params.focus) {
    console.log('Missing params or focus parameter');
    return notFound();
  }

  // console.log('Projects data:', projects); // Debug log
  // console.log('Looking for slug:', params.focus); // Debug log

  const project = projects.find(p => p.slug === params.focus);
  
  //console.log('Found project:', project); // Debug log

  if (!project) {
    console.log('Project not found for slug:', params.focus);
    return notFound();
  }

  if (!project.src || !Array.isArray(project.src)) {
    console.log('Invalid project data structure:', project);
    return notFound();
  }

  return (
    <main>
      <ReturnButton />
      <FocusGallery project={project} />
      <NextButton project={project}/>
    </main>
  );
}

// Add error boundary
// export function generateStaticParams() {
//   try {
//     return projects.map((project) => ({
//       focus: project.slug,
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }