"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./styles.module.scss";

export default function FocusGallery({ project }) {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);

  const [imageSizes, setImageSizes] = useState({ newWidth: 200, newHeight: 270 });

  const defaultSizes = {
    width: 1920,
    height: 1080,
  };

  const calculateSizes = (width, height) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const widthScale = windowWidth / defaultSizes.width;
    const heightScale = windowHeight / defaultSizes.height;

    const scale = Math.min(widthScale, heightScale);

    const newWidth = width * scale;
    const newHeight = height * scale;

    return { newWidth, newHeight };
  };

  useEffect(() => {
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

  const manageMouseMove = (e) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (!requestAnimationFrameId) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const animate = () => {
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
  };

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

  const lerp = (start, end, amount) => start * (1 - amount) + end * amount;

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
            src={`../${src}`}
            width={imageSizes.newWidth}
            height={imageSizes.newHeight}
            alt={`plane1-${index + 1}`}
            priority={true}
          />
        ))}
      </div>

      <div ref={plane2} className={styles.plane}>
        {project.src.slice(2, 5).map((src, index) => (
          <Image
            key={index}
            src={`../${src}`}
            width={imageSizes.newWidth}
            height={imageSizes.newHeight}
            alt={`plane2-${index + 1}`}
            priority={true}
          />
        ))}
      </div>

      {project.src.length >= 5 && (
        <div ref={plane3} className={styles.plane}>
          {project.src.slice(5, 9).map((src, index) => (
            <Image
              key={index}
              src={`../${src}`}
              width={imageSizes.newWidth * 0.5}
              height={imageSizes.newHeight * 1.1}
              alt={`plane3-${index + 1}`}
              priority={true}
            />
          ))}
        </div>
      )}

      <div className={styles.title}>
        <h1>{project.title}</h1>
        <p>{project.desc}</p>
      </div>
    </div>
  );
}