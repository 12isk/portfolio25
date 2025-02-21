self.onmessage = function(event) {
    const { xSpeed, ySpeed, frameCount } = event.data;
    let currentFrame = frameCount;

    function animate() {
        currentFrame += 1;
        const rotation = {
            x: xSpeed * currentFrame,
            y: ySpeed * currentFrame
        };

        // Send the updated rotation back to the main thread
        self.postMessage(rotation);

        // Continue the animation
        requestAnimationFrame(animate);
    }

    animate();
};