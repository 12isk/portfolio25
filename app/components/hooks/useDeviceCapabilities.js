// hooks/useDeviceCapabilities.js
import { useState, useEffect } from 'react';

export function useDeviceCapabilities() {
    // Initialize with conservative default values
    const [deviceTier, setDeviceTier] = useState('low');
    const [capabilities, setCapabilities] = useState({
        maxTextureSize: 1024,
        hardwareConcurrency: 4,
        isWebGL2: false,
        isMobile: false
    });

    useEffect(() => {
        // Create a temporary canvas to check WebGL capabilities
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        
        if (gl) {
            // Gather detailed device information
            const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            const hardwareConcurrency = navigator.hardwareConcurrency || 4;
            const isWebGL2 = !!canvas.getContext('webgl2');
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            setCapabilities({
                maxTextureSize,
                hardwareConcurrency,
                isWebGL2,
                isMobile
            });

            // Determine device tier based on capabilities
            if (hardwareConcurrency >= 8 && maxTextureSize >= 8192 && isWebGL2) {
                setDeviceTier('high');
            } else if (hardwareConcurrency >= 4 && maxTextureSize >= 4096) {
                setDeviceTier('medium');
            } else {
                setDeviceTier('low');
            }
        }
    }, []);

    return { deviceTier, capabilities };
}