"use client";
import React, { useEffect, useRef } from "react";

// Easing functions (manually implemented)
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); // Example from easings.net
const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const SmoothScroll = ({ children }) => {
  const scrollContainerRef = useRef(null); // Scrollable container
  const startTimeRef = useRef(null); // Tracks the start time of easing

  const currentScroll = useRef(0); // Current scroll position
  const targetScroll = useRef(0); // Target scroll position
  const ease = 0.08; // Base easing factor
  const duration = 500; // Duration for scroll ease (in ms)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Handle mouse wheel event
    const onWheel = (e) => {
      e.preventDefault();
      targetScroll.current += e.deltaY; // Adjust target position
      // Clamp target scroll position
      targetScroll.current = Math.max(
        0,
        Math.min(
          targetScroll.current,
          scrollContainer.scrollHeight - window.innerHeight
        )
      );
    };


    const smoothScroll = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsedTime = timestamp - startTimeRef.current; // Elapsed time
      const progress = Math.min(elapsedTime / duration, 1); // Normalize progress [0, 1]

      // Apply easing function
      const easedProgress = easeOutCubic(progress); // Try other easing functions here
      const scrollDifference = targetScroll.current - currentScroll.current;

      currentScroll.current += scrollDifference * easedProgress;

      // Apply the scroll position with transform
      scrollContainer.style.transform = `translateY(-${currentScroll.current}px)`;

      if (progress < 1 || Math.abs(scrollDifference) > 0.1) {
        requestAnimationFrame(smoothScroll);
      } else {
        startTimeRef.current = null; // Reset easing timer for next animation
      }
    };

    // Attach event listeners
    window.addEventListener("wheel", onWheel, { passive: false });
    requestAnimationFrame(smoothScroll);

    // Cleanup
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
