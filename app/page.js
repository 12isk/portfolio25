"use client";
import dynamic from 'next/dynamic';
import ContinuousScroll from './components/ContinuousScroll';

const Scene = dynamic(() => import('./components/Presentation'), {
  ssr: false // Ensure server-side rendering is disabled for dynamic import
});

export default function Home() {
  return (
    <main className="relative h-screen">
      {/* <ContinuousScroll /> */}
      <Scene />
    </main>
  );
}