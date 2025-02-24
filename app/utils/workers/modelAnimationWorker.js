self.onmessage = function(event) {
    // Add performance monitoring to measure impact
let frameTimeLog = [];

// In your worker
function animate() {
    const start = performance.now();
    
    // Your animation calculations
    currentRotationX += xSpeed * deltaTime;
    currentRotationY += ySpeed * deltaTime;

    // Log performance occasionally
    frameTimeLog.push(performance.now() - start);
    if (frameTimeLog.length > 100) {
        const avgTime = frameTimeLog.reduce((a, b) => a + b) / frameTimeLog.length;
        console.log('Average calculation time:', avgTime.toFixed(2), 'ms');
        frameTimeLog = [];
    }

    self.postMessage({x: currentRotationX, y: currentRotationY});
}
};