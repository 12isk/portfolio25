"use client";
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./styles.module.scss";
import ImageModal from '../ImageModal';
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

    const newWidth = width * scale + 50;
    const newHeight = height * scale + 50;

    return { newWidth, newHeight };
  });

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

  useEffect(() => {
    console.log("src", project.src);
    const handleResize = () => {
      const { newWidth, newHeight } = calculateSizes(200, 270);
      setImageSizes({ newWidth, newHeight });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const easing = 0.079;
  const speed = 0.01;
  let xForce = 0;
  let yForce = 0;
  let requestAnimationFrameId = null;

  const manageMouseMove = useCallback(
    (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  });

  const animate = useCallback( 
    () => {
      xForce = lerp(xForce, 0, easing);
      yForce = lerp(yForce, 0, easing);

      if (plane1.current) {
        gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
      }
      if (plane2.current) {
        gsap.set(plane2.current, { x: `+=${xForce * 0.5}`, y: `+=${yForce * 0.5}` });
      }
      if (plane3.current) {
        gsap.set(plane3.current, { x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.25}` });
      }

      if (Math.abs(xForce) < 0.01 && Math.abs(yForce) < 0.01) {
        xForce = 0;
        yForce = 0;
      }

      if (xForce > 0 || yForce > 0) {
        requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(requestAnimationFrameId);
        requestAnimationFrameId = null;
      }
  });

  const animateReturn = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);

    if (plane1.current) {
      gsap.set(plane1.current, { x: `-=${xForce}`, y: `-=${yForce}` });
    }
    if (plane2.current) {
      gsap.set(plane2.current, { x: `-=${xForce * 0.5}`, y: `-=${yForce * 0.5}` });
    }
    if (plane3.current) {
      gsap.set(plane3.current, { x: `-=${xForce * 0.25}`, y: `-=${yForce * 0.25}` });
    }

    if (Math.abs(xForce) < 0.01 && Math.abs(yForce) < 0.01) {
      xForce = 0;
      yForce = 0;
    }

    if (xForce > 0 || yForce > 0) {
      requestAnimationFrame(animateReturn);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  let isDragging = false;
  let touchStartX = 0;
  let touchStartY = 0;
  const manageTouchStart = (e) => {
    const touch = e.touches[0];
    isDragging = true;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  };

  const manageTouchMove = (e) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const movementX = touch.clientX - touchStartX;
    const movementY = touch.clientY - touchStartY;

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    xForce += movementX * speed;
    yForce += movementY * speed;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const manageTouchEnd = () => {
    isDragging = false;
    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(animateReturn);
    }
  };

  // Create an optimized image component that implements progressive loading
  // const OptimizedImage = useCallback(({ src, index, plane }) => {
  //   const [isLoaded, setIsLoaded] = useState(false);
    
  //   return (
  //     <div className={styles.imageWrapper}>
  //       {/* Low quality placeholder */}
  //       <Image
  //         src={`/${src}`}
  //         quality={20}
  //         width={imageSizes.newWidth * 0.1}
  //         height={imageSizes.newHeight * 0.1}
  //         className={`${styles.placeholder} ${isLoaded ? styles.hidden : ''}`}
  //         alt={`placeholder-${index + 1}`}
  //         priority={index === 0}
  //       />
        
  //       {/* High quality main image */}
  //       <Image
  //         src={`/${src}`}
  //         quality={95}
  //         width={imageSizes.newWidth}
  //         height={imageSizes.newHeight}
  //         className={`${styles.mainImage} ${isLoaded ? styles.visible : ''}`}
  //         alt={`${plane}-${index + 1}`}
  //         onLoad={() => setIsLoaded(true)}
  //         priority={index === 0}
  //         sizes={`(max-width: 768px) 100vw, ${imageSizes.newWidth}px`}
  //         onClick={() => handleImageClick(src)}
  //         placeholder="blur"
  //         blurDataURL={`data:image/svg+xml;base64,${generateOptimizedBlurPlaceholder()}`}
  //       />
  //     </div>
  //   );
  // }, [imageSizes, handleImageClick]);

  // Generate a better blur placeholder
  const generateOptimizedBlurPlaceholder = () => {
    // Create a more sophisticated blur placeholder
    // This is a simplified version - you might want to generate this server-side
    return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  };


  const lerp = (start, end, amount) => start * (1 - amount) + end * amount;

  // return (

  //   <div className={styles.main} /* ... other props ... */>
  //     <div ref={plane1} className={styles.plane}>
  //       {project.src.slice(0, 2).map((src, index) => (
  //         <OptimizedImage
  //           key={index}
  //           src={src}
  //           index={index}
  //           plane="plane1"
  //         />
  //       ))}
  //     </div>

  //     <div ref={plane2} className={styles.plane}>
  //       {project.src.slice(2, 5).map((src, index) => (
  //         <OptimizedImage
  //           key={index}
  //           src={src}
  //           index={index}
  //           plane="plane1"
  //         />
  //       ))}
  //     </div>

  //     <div ref={plane3} className={styles.plane}>
  //       {project.src.slice(5, 9).map((src, index) => (
  //         <OptimizedImage
  //           key={index}
  //           src={src}
  //           index={index}
  //           plane="plane1"
  //         />
  //       ))}
  //     </div>


  //   </div>
  // );

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
        {project.src.slice(0, 2).map((src, index) => (
          <Image
            key={index}
            quality={100} 
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
        {project.src.slice(2, 5).map((src, index) => (
          <Image
            key={index}
            quality={100} 
            placeholder="blur"
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

      {project.src.length >= 5 && (
        <div ref={plane3} className={styles.plane}>
          {project.src.slice(5, project.src.length).map((src, index) => (
            <Image
              key={index}
              placeholder="blur"
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

      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage ? `../${selectedImage}` : ''}
        onClose={() => setSelectedImage(null)}
        width={imageSizes.newWidth * 2}
        height={imageSizes.newHeight * 2}
      />

      <div className={styles.title}>
        <h1>{project.title}</h1>
        <p>{project.desc}</p>
      </div>
    </div>
  );
}