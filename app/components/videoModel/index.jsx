import styles from './styles.module.scss';
import React, { useEffect, useRef, useState } from 'react';

// Create this CSS module

export default function VideoModel({ onPointerOver, onPointerLeave, onLoad }) {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Handle video loading
      video.addEventListener('loadeddata', () => {
        setIsLoaded(true);
        if (onLoad) onLoad();
      });
      
      // Auto-play when ready
      video.addEventListener('canplaythrough', () => {
        video.play().catch(err => console.error("Video autoplay failed:", err));
      });
    }
    
    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => {});
        video.removeEventListener('canplaythrough', () => {});
      }
    };
  }, [onLoad]);

  return (
    <div 
      className={styles.videoContainer}
      
    >
      <video
        ref={videoRef}
        className={styles.modelVideo}
        playsInline
        muted
        loop
        onEnded={() => {
          console.log('video ended');
        }}
        autoPlay
        preload="auto"
        //poster="/model-poster.jpg" // Optional: Add a poster image
      >
        <source src="/media/model-rec.webm" type="video/webm" />
        {/* <source src="/hero-rec.webm" type="video/webm" /> Add WebM format for better compression */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 