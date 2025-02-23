self.onmessage = function (e) {
    const { mouse, delayedMouse, ease } = e.data;
  
    // Perform the lerp calculation
    const newDelayedMouse = {
      x: (1 - ease) * delayedMouse.x + ease * mouse.x,
      y: (1 - ease) * delayedMouse.y + ease * mouse.y,
    };
  
    // Send the result back to the main thread
    self.postMessage(newDelayedMouse);
  };