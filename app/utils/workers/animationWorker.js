// Create a new file: workers/animationWorker.js
// This worker will handle the animation calculations
self.onmessage = (event) => {
    // Import GSAP in the worker
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
    
    const { bannerCount } = event.data;
    
    // Calculate animation keyframes
    const keyframes = Array.from({ length: bannerCount }, (_, i) => ({
      banner: i,
      timeline: [
        { yPercent: 0, time: 0 },
        { yPercent: 100, time: 1.2 + (i * 0.05) }
      ]
    }));
    
    // Send calculated keyframes back to main thread
    self.postMessage({ keyframes });
  };