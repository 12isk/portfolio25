import React from 'react';
import { gsap } from 'gsap';
import styles from './styles.module.scss';

export default function Index() {
  const colors = ["#832388", "#e3436b", "#f0772f", "#33CCFF", "#0c0c0c"];
  //const banners = useRef([]);

//   const animatePageIn = () => {
//     if (banners.current && banners.current.length > 0) {
//         const tl = gsap.timeline();

//         tl.set(banners.current, {  
//             yPercent: 0 
//         }).to(banners.current, {
//             yPercent: 100,
//             stagger:0.2,
//         });
//         }
//   };

//   const animatePageOut = (href, router) => {
//     if (banners.current && banners.current.length > 0) {
//         const tl = gsap.timeline();

//         tl.set(banners.current, {  
//             yPercent: -100 
//         }).to(banners.current, {
//             yPercent: 0,
//             stagger:0.2,
//             onComplete: () => {
//                 router.push(href);
//             },
//         });
//         }
//   };



  return (
    <div className={styles.container}>
      {/* <div className={styles.mainBanner} /> */}
      {colors.map((color, index) => (
        <div key={index}
          id={`banner-${index}`}
          //ref={(ref) => (banners.current[index] = ref)} 
          className={styles.banner}
          style={{ backgroundColor: color, zIndex: index }} />
      ))}
    </div>
  );
}
