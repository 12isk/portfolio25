// cursorWorker.js
// This worker handles the animation calculations for the gradient cursor

// Calculation variables
let mouse = { x: 0, y: 0 };
let delayedMouse = { x: 0, y: 0 };
let isHovered = false;
const ease = 0.1;

// Lerp function for smooth animation
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

// Animation loop that runs in the worker
function animateWorker() {
  // Calculate smooth mouse position
  delayedMouse = {
    x: lerp(delayedMouse.x, mouse.x, ease),
    y: lerp(delayedMouse.y, mouse.y, ease)
  };
  
  // Send calculated position back to the main thread
  self.postMessage({
    type: 'CURSOR_POSITION',
    payload: {
      x: delayedMouse.x,
      y: delayedMouse.y,
      isHovered: isHovered
    }
  });
  
  // Continue the animation loop
  setTimeout(animateWorker, 1000 / 60); // Roughly 60fps timing
}

// Start the animation loop
animateWorker();

// Listen for messages from the main thread
self.addEventListener('message', (e) => {
  const { type, payload } = e.data;
  
  switch (type) {
    case 'MOUSE_MOVE':
      // Update mouse position
      mouse = payload;
      break;
    
    case 'HOVER_STATE':
      // Update hover state
      isHovered = payload;
      break;
      
    default:
      break;
  }
});