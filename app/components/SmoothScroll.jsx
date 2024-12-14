// ./components/ContinuousScroll.js

import React, { useRef, useEffect } from 'react';

export default function ContinuousScroll() {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const scrollHeight = scrollContainerRef.current.scrollHeight;
        const clientHeight = scrollContainerRef.current.clientHeight;

        const scrollStep = () => {
            if (scrollContainerRef.current.scrollTop < scrollHeight - clientHeight) {
                scrollContainerRef.current.scrollTop += 1; // Adjust scroll speed here
            } else {
                scrollContainerRef.current.scrollTop = 0; // Scroll back to the top
            }
        };

        const scrollInterval = setInterval(scrollStep, 50); // Adjust scroll speed here (milliseconds)

        return () => clearInterval(scrollInterval); // Clean up on unmount
    }, []);

    return (
        <div
            ref={scrollContainerRef}
            style={{
                width: '100%',
                height: '100vh',
                overflowY: 'scroll',
                border: '1px solid #ccc',
            }}
        >
            {/* Placeholder content to make the container scrollable */}
            <div style={{ height: '200vh' }} />
        </div>
    );
}
