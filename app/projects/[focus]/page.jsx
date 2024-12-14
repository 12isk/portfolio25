import GlowButton from '@/app/components/buttons/button/page';
import ReturnButton from '@/app/components/buttons/return_button/page';
import FocusGallery from '@/app/components/focusgallery/page';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import projects from "../../data/projects.json";
import styles from './styles.module.scss';
import NextButton from '@/app/components/buttons/next_button/page';

// This function generates the static params (slugs) for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    focus: project.slug,  // Slug for each project
  }));
}

const CardScene = dynamic(() => import('../../components/card/CardScene'), {
  ssr: false // Ensure server-side rendering is disabled for dynamic import
});

// The focus page that retrieves project details based on the slug
export default function Focus({ params }) {
  // Find the project by slug from the params
  const project = projects.find(
    (project) => project.slug === params.focus
  );

  // If the project is not found, return a 404 response
  if (!project) {
    return notFound();
  }
  console.log(project.src);

 
  
  // Return the page content for the found project
  return (
    <main>
      <ReturnButton />
      <FocusGallery project={project} />
      <NextButton project={project}/>
    </main>
    
  )
}
