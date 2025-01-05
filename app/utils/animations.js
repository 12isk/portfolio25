import gsap from 'gsap';


function easeInOutExpo(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
    }

// export const animatePageIn = () => {

//     const banners = Array.from({length: 5}, (_, i) => 
//         document.getElementById(`banner-${i}`)).reverse();
//     //console.log(banners);
//     if (!banners.every(Boolean)) return;

//     if (banners && banners.length > 0) {
//         const tl = gsap.timeline();

//         tl.set(banners, {  
//             yPercent: 0 
//         }).to(banners, {
//             yPercent: 100,
//             duration: 1.2,  // Longer duration for more visible movement
//             stagger: 0.05,
//             // ease: easeInOutExpo,
//         });
//   }
// }

export const animatePageIn = () => {
    // Create and initialize the worker
    const animationWorker = new Worker(new URL('./workers/animationWorker.js', import.meta.url));
    
    // Get banner elements
    const banners = Array.from({ length: 5 }, (_, i) =>
      document.getElementById(`banner-${i}`)).reverse();
      
    if (!banners.every(Boolean)) return;
    
    // Start the worker calculations
    animationWorker.postMessage({ bannerCount: banners.length });
    
    // Handle the animation on the main thread using the calculated keyframes
    animationWorker.onmessage = (event) => {
      const { keyframes } = event.data;
      
      const tl = gsap.timeline();
      
      // Apply the pre-calculated keyframes
      tl.set(banners, {
        yPercent: 0
      });
      
      keyframes.forEach(({ banner, timeline }) => {
        tl.to(banners[banner], {
          yPercent: timeline[1].yPercent,
          duration: timeline[1].time - timeline[0].time,
          ease: 'none'
        }, timeline[0].time);
      });
      
      // Clean up
      animationWorker.terminate();
    };
  };

export const animatePageOut = (href, router) => {

    const banners = Array.from({length: 5}, (_, i) => 
        document.getElementById(`banner-${i}`)).reverse();
    //console.log(banners);
    if (!banners.every(Boolean)) return;

    if (banners && banners.length > 0) {
        const tl = gsap.timeline();

        tl.set(banners, {  
            yPercent: -100 
        }).to(banners, {
            yPercent: 0,
            stagger:0.05,
            onComplete: () => {
                router.push(href);
            },
        });
        }
    
}