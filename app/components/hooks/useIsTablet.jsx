"use client";
import { useState, useEffect } from 'react';

const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      // Get both screen dimensions and window dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      
      // Check for common tablet dimensions (both portrait and landscape)
      const isTabletDimensions = (
        // iPad Mini, Air, Pro 11"
        (width >= 768 && width <= 1024 && height >= 1024 && height <= 1366) ||
        (width >= 1024 && width <= 1366 && height >= 768 && height <= 1024) ||
        
        // iPad Pro 12.9"
        (width >= 1024 && width <= 1366 && height >= 1366 && height <= 1024) ||
        
        // Common Android tablets
        (width >= 800 && width <= 1280 && height >= 1280 && height <= 800) ||
        
        // Generic tablet size ranges
        (width >= 768 && width <= 1280 && height >= 600 && height <= 1280)
      );

      // Check for tablet-specific features
      const isTabletFeatures = (
        // Check if device has touch capabilities
        ('ontouchstart' in window || navigator.maxTouchPoints > 0) &&
        // Check if device is not a phone (using screen width as indicator)
        screenWidth >= 768 &&
        // Check if not a desktop/laptop (using userAgent as a hint)
        !/Windows NT|Mac OS X/.test(navigator.userAgent)
      );

      // Additional checks for specific tablet indicators
      const isTabletUA = /iPad|Android(?!.*Mobile)|Tablet/.test(navigator.userAgent);
      
      // Aspect ratio check (most tablets are between 4:3 and 16:10)
      const aspectRatio = width / height;
      const isTabletRatio = aspectRatio >= 0.5 && aspectRatio <= 1.8;

      // Combined check for tablet determination
      setIsTablet(
        isTabletDimensions &&
        isTabletFeatures &&
        isTabletRatio ||
        isTabletUA
      );
    };

    // Initial check
    checkTablet();

    // Add event listeners for changes
    window.addEventListener('resize', checkTablet);
    window.addEventListener('orientationchange', checkTablet);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkTablet);
      window.removeEventListener('orientationchange', checkTablet);
    };
  }, []);

  return isTablet;
};

export default useIsTablet;