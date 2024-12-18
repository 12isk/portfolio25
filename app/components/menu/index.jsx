"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, transform } from "framer-motion";
import styles from "./styles.module.scss";
import Showreel from "../Showreel";

const menuLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

const colors = ["#832388", "#e3436b", "#f0772f", "#33CCFF"];

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const menuVariants = {
    open: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        duration: 1.25,
        ease: [0.42, 0, 0.58, 1], // Cubic Bézier easing
      },
    },
    closed: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transition: {
        duration: 1.25,
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

  const hoverVariants = {
    scale: 1.1,
    x: 10,
    transition: {
      duration: 0.5,
      ease: [0.5, 1, 0.89, 1], // Cubic Bézier easing
    },
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuBar} style={{ display: menuOpen ? "none" : "flex" }}>
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
                      <Link href={link.path} onClick={toggleMenu} style={{ color: colors[index] }}>
                        {link.label}
                      </Link>
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
                  <a href="#">LinkedIn &#8599;</a>
                  <a href="https://github.com/12isk">Github &#8599;</a>
                </div>
                <div className={styles.menuInfoCol}>
                  <p>x@gmail.com</p>
                  <p>123-456-7890</p>
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
  );
}
