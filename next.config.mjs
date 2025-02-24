// Import bundle analyzer using ES Module syntax
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove the output: "export" line
    
    

    images: {
      // Now we can use Next.js image optimization
      unoptimized: false,
      domains: [], // Add any external image domains you might use
    },
    
    webpack: (config, { dev, isServer }) => {
      if (!isServer) {
        config.module.rules.push({
          test: /\.worker\.(js|ts)$/,
          use: {
            loader: 'worker-loader',
            options: {
              filename: 'static/[hash].worker.js',
              publicPath: '/_next/',
            },
          },
        });
      }
      return config;
    },
  
    // Additional Next.js features you can now use
    experimental: {
      optimizeCss: false,
      optimizePackageImports: ['ReactThreeFiber', 'Framermotion', 'three', 'gsap', 'framer-motion','motion'],
      //serverActions: true, // Enable if you want to use server actions
    },
  };


  
  export default withBundleAnalyzer(nextConfig);