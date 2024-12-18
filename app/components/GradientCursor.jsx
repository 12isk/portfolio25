import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

const colors2 = ["#832388", "#e3436b", "#f0772f", "#33CCFF"];

export default function GradientCursor({ isHovered }) {
  const size = isHovered ? 100 : 60;

  // Cursor positions
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  // Scroll position references
  const currentScroll = useRef(0); // Current lerped scroll
  const targetScroll = useRef(0); // Target scroll position

  const circles = useRef([]); // Refs for the cursor circles

  const ease = 0.03; // Lerp easing factor

  // Lerp function
  const lerp = (a, b, n) => (1 - n) * a + n * b;

  // Handle mouse movement
  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.current = { x: clientX, y: clientY };
  };

  // Handle scroll
  const manageScroll = () => {
    targetScroll.current = window.scrollY;
  };

  // Move and position cursor circles
  const moveCircle = (x, y) => {
    circles.current.forEach((circle, i) => {
      if (circle) {
        gsap.set(circle, { x, y, xPercent: -50, yPercent: -50 });
      }
    });
  };

  // Animation loop
  const animate = () => {
    // Smoothly lerp the scroll position
    currentScroll.current = lerp(currentScroll.current, targetScroll.current, ease);

    // Smoothly lerp the mouse position
    delayedMouse.current = {
      x: lerp(delayedMouse.current.x, mouse.current.x, ease),
      y: lerp(delayedMouse.current.y, mouse.current.y + currentScroll.current, ease),
    };

    // Move cursor
    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    requestAnimationFrame(animate);
  };

  // Setup event listeners
  useEffect(() => {
    targetScroll.current = window.scrollY; // Initialize scroll position

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("scroll", manageScroll);

    animate(); // Start animation loop

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("scroll", manageScroll);
    };
  }, []);

  // Render cursor elements
  return (
    <>
      {colors2.map((color, i, array) => (
        <div
          ref={(ref) => (circles.current[i] = ref)}
          key={color}
          className="fixed top-0 left-0 rounded-full mix-blend-difference pointer-events-none"
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            zIndex: 9999,
            filter: `blur(${isHovered ? '20px' : '5px'})`,
            transition: `width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out, transform ${
              (array.length - i) * 0.05
            }s ease-out`,
          }}
        ></div>
      ))}
    </>
  );
}
