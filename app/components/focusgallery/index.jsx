"use client";
import React, { useRef, useState, useEffect, useCallback, useMemo, use } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./styles.module.scss";
import ImageFocus from "./ImageFocus"
import { motion, AnimatePresence } from "framer-motion";


export default function FocusGallery({ project }) {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const defaultSizes = useMemo(() => ({ width: 1920, height: 1080 }), []);

  const calculateSizes = useCallback(
    (width, height) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const widthScale = windowWidth / defaultSizes.width;
    const heightScale = windowHeight / defaultSizes.height;

    const scale = Math.min(widthScale, heightScale);

    const newWidth = width * scale + 30;
    const newHeight = height * scale + 30;

    return { newWidth, newHeight };
  },[defaultSizes.width, defaultSizes.height]);

  const [imageSizes, setImageSizes] = useState(() => {
    if (typeof window !== 'undefined') {
      return calculateSizes(300, 350); // Larger initial dimensions
    }
    return { newWidth: 300, newHeight: 350 };
  });
  

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "60%" },
    open: { scale: 1, x: "-50%", y: "60%",
      transition: { duration: 0.5, ease:[0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: "-50%", y: "50%",
      transition: { duration: 0.8, ease:[0.76, 0, 0.24, 1] } },
  };

  const handleImageClick = (src) => {
    console.log('Image clicked:', src);
    setSelectedImage(selectedImage === src ? null : src);
  };

  // useEffect(() => {
  //   console.log("src", project.src);
  //   const handleResize = () => {
  //     const { newWidth, newHeight } = calculateSizes(200, 270);
  //     setImageSizes({ newWidth, newHeight });
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [calculateSizes, project.src]);

  const easing = 0.079;
  const speed = 0.01;
  const isDragging = useRef(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  let xForce = useRef(0);
  let yForce = useRef(0);
  let requestAnimationFrameId = useRef(null);

  const lerp = useCallback((start, end, amount) => {
    return start * (1 - amount) + end * amount;
  }, []);

  // Animation function with proper ref handling
  const animate = useCallback(() => {
    // Update forces using lerp
    xForce.current = lerp(xForce.current, 0, easing);
    yForce.current = lerp(yForce.current, 0, easing);

    // Apply transformations to planes
    if (plane1.current) {
      gsap.set(plane1.current, { 
        x: `+=${xForce.current}`, 
        y: `+=${yForce.current}` 
      });
    }
    if (plane2.current) {
      gsap.set(plane2.current, { 
        x: `+=${xForce.current * 0.5}`, 
        y: `+=${yForce.current * 0.5}` 
      });
    }
    if (plane3.current) {
      gsap.set(plane3.current, { 
        x: `+=${xForce.current * 0.25}`, 
        y: `+=${yForce.current * 0.25}` 
      });
    }

    // Check if animation should stop
    if (Math.abs(xForce.current) < 0.01 && Math.abs(yForce.current) < 0.01) {
      xForce.current = 0;
      yForce.current = 0;
      cancelAnimationFrame(requestAnimationFrameId.current);
      requestAnimationFrameId.current = null;
      return;
    }

    // Continue animation
    requestAnimationFrameId.current = requestAnimationFrame(animate);
  }, [lerp]); // Only depend on lerp

  // Mouse movement handler with proper animation triggering
  const manageMouseMove = useCallback((e) => {
    const { movementX, movementY } = e;
    
    // Update forces based on mouse movement
    xForce.current += movementX * speed;
    yForce.current += movementY * speed;

    // Start animation if not already running
    if (!requestAnimationFrameId.current) {
      requestAnimationFrameId.current = requestAnimationFrame(animate);
    }
  }, [animate, speed]);

  // Touch handlers with proper ref usage
  const manageTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    isDragging.current = true;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }, []);

  const manageTouchMove = useCallback((e) => {
    if (!isDragging.current) return;

    const touch = e.touches[0];
    const movementX = touch.clientX - touchStartX.current;
    const movementY = touch.clientY - touchStartY.current;

    // Update touch positions
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;

    // Update forces
    xForce.current += movementX * speed;
    yForce.current += movementY * speed;

    // Start animation if not running
    if (!requestAnimationFrameId.current) {
      requestAnimationFrameId.current = requestAnimationFrame(animate);
    }
  }, [animate, speed]);

  const manageTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Clean up animations on unmount
  useEffect(() => {
    console.log("selectedImage", selectedImage);
    return () => {
      if (requestAnimationFrameId.current) {
        cancelAnimationFrame(requestAnimationFrameId.current);
      }
    };
  }, []);

  // Generate a better blur placeholder
  const generateOptimizedBlurPlaceholder = () => {
    // Create a more sophisticated blur placeholder
    // This is a simplified version - you might want to generate this server-side
    return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  };


  return (
    <div
      className={styles.main}
      onMouseMove={manageMouseMove}
      onTouchStart={manageTouchStart}
      onTouchMove={manageTouchMove}
      onTouchEnd={manageTouchEnd}
      style={{ overflow: "hidden" }}
    >

          
    
      <div ref={plane1} className={styles.plane}>
        {project.src.slice(0, 3).map((src, index) => (
          <Image
            key={index}
            quality={100} 
            //className={styles.image}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,...`}
            src={`/${src}`}
            width={imageSizes.newWidth}
            height={imageSizes.newHeight}
            alt={`plane1-${index + 1}`}
            priority={true}
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>

      <div ref={plane2} className={styles.plane}>
        {project.src.slice(3, 6).map((src, index) => (
          <Image
            key={index}
            quality={100} 
            placeholder="blur"
            //className={styles.image}
            blurDataURL={`data:image/svg+xml;base64,...`}
            src={`/${src}`}
            width={imageSizes.newWidth}
            height={imageSizes.newHeight}
            alt={`plane2-${index + 1}`}
            priority={true}
            onClick={() => handleImageClick(src)}
          />
        ))}
      </div>

      {project.src.length >= 6 && (
        <div ref={plane3} className={styles.plane}>
          {project.src.slice(5, project.src.length).map((src, index) => (
            <Image
              key={index}
              placeholder="blur"
              //className={styles.image}
              quality={100} 
              blurDataURL={`data:image/svg+xml;base64,...`}
              src={`/${src}`}
              width={imageSizes.newWidth * 0.5}
              height={imageSizes.newHeight * 1.1}
              alt={`plane3-${index + 1}`}
              priority={true}
              onClick={() => handleImageClick(src)}
            />
          ))}
        </div>
      )}
      <ImageFocus src={selectedImage} />

      

      <div className={styles.title} style={{ filter: `drop-shadow(0px 0px 8px ${project.color})` }}>
        <h1>{project.title}</h1>
        <p>{project.desc}</p>
      </div>
    </div>
  );
}