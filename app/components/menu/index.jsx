"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use router for navigation
import Link from "next/link";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence, transform } from "framer-motion";
import styles from "./styles.module.scss";
import Showreel from "../Showreel";

const menuLinks = [
  { label: "About", path: "#about" },
  { label: "Projects", path: "#projects" },
  { label: "Contact", path: "#contact" },
  { label: "Playground", path: "/playground" },

];

const colors = ["#832388", "#e3436b", "#f0772f", "#33CCFF"];

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const blurOverlay = useRef(null);
  const router = useRouter(); // Hook to control navigation

  const menuVariants = {
    open: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1], // Cubic Bézier easing
      },
    },
    closed: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transition: {
        duration: 0.7,
        ease: [0.42, 0, 0.58, 1], // Cubic Bézier easing
      },
    },
  };

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.42, 0, 0.58, 1], // Cubic Bézier easing
        staggerChildren: 0.1,
      },
    },
    closed: {
      y: 75,
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.42, 0, 0.58, 1], // Cubic Bézier easing
        staggerChildren: 0.1,
      },
    },
  };  

  // TODO: fix navigation to home and scroll to target
  const lenis = useLenis();
  
  const handleHomeAndScroll = (targetId) => {
    toggleMenu(); // Close the menu
    
    const scrollToTarget = () => {
      const target = document.querySelector(targetId);
      if (target && lenis) {
        // On mobile, use a simpler scrolling setup
        if (window.innerWidth <= 768) {
          lenis.scrollTo(target, {
            offset: 0,
            immediate: true,
            duration: 1,
            lock: true,
          });
        } else {
          // On desktop, use the fancier easing
          lenis.scrollTo(target, {
            offset: 0,
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    };
  
    if (window.location.pathname === '/') {
      scrollToTarget();
    } else {
      router.push('/');
      setTimeout(scrollToTarget, 750); // Increased timeout for mobile
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // How far the page is scrolled
  
      const blurStrength = Math.min(scrollY / 20, 10); // Adjust blur intensity (max 10px)
      const overlayOpacity = Math.min(scrollY / 500, 1); // Fade in overlay (0 to 1)
  
      // Apply the dynamic styles to the blurOverlay
      if (blurOverlay.current) {
        blurOverlay.current.style.backdropFilter = `blur(${blurStrength}px)`;
        blurOverlay.current.style.webkitBackdropFilter = `blur(${blurStrength}px)`;
        blurOverlay.current.style.opacity = overlayOpacity;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // TOODO: Add blur effect on the back of the nav bar, along with some chromatic abberation lol

  const hoverVariants = {
    scale: 1.1,
    x: 10,
    transition: {
      duration: 0.5,
      ease: [0.5, 1, 0.89, 1], // Cubic Bézier easing
    },
  };

  return (
    <>
    
    <div className={styles.menuContainer}>
      <div className={styles.menuBar} style={{ display: menuOpen ? "none" : "flex" }}>
        {/* <div ref={blurOverlay} className={styles.blurOverlay}/> */}

        <div className={styles.menuLogo}>
          <Link href="/">12isk</Link>
        </div>
        <div className={styles.menuOpen} onClick={toggleMenu}>
          <p>Menu</p>
        </div>
      </div>



      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.menuOverlay}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className={styles.menuOverlayBar}>
              <div className={styles.menuLogo}>
                <Link href="/">12isk</Link>
              </div>
              <div className={styles.menuClose} onClick={toggleMenu}>
                <p>Close</p>
              </div>
            </div>

            <div className={styles.menuCopy}>
              <motion.div className={styles.menuLinks} variants={linkVariants}>
                {menuLinks.map((link, index) => (
                  <motion.div
                    className={styles.menuLinkItem}
                    key={index}
                    variants={linkVariants}
                    whileHover={hoverVariants} // Apply hover animation
                  >
                    <div className={styles.menuLinkItemHolder}>
                      {link.path.startsWith("#") ? (
                        <a href="/" onClick={(e) => { 
                          e.preventDefault();
                          handleHomeAndScroll(link.path);
                        }}
                        style={{ color: colors[index] }}
                      >
                        {link.label}
                      </a>)
                      :(
                        <Link href={link.path} onClick={toggleMenu} style={{ color: colors[index] }}>
                          {link.label}
                        </Link>
                      )}
  
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className={styles.menuBottom}>
              <div className={styles.menuCloseIcon} onClick={toggleMenu}>
                <p>&#x2715;</p>
              </div>
              <div className={styles.menuInfo}>
                <div className={styles.menuInfoCol}>
                  <a href="https://instagram.com/twelveisk">Instagram &#8599;</a>
                  <a href="https://www.linkedin.com/in/ibrahima-s-keita-18295b22a/">LinkedIn &#8599;</a>
                  <a href="https://github.com/12isk">Github &#8599;</a>
                </div>
                <div className={styles.menuInfoCol}>
                  <p>contact@12isk.xyz</p>
                  <p>HMU!</p>
                </div>
              </div>
              <div className={styles.menuPreview}>
                <Showreel />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
