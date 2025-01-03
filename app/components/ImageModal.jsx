import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ImageModal = ({ isOpen, image, onClose, width = 500, height = 300 }) => {
  console.log('Modal state:', { isOpen, image }); // Debug log

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="debug-modal-wrapper">
          <motion.div
            className="fixed inset-0 bg-black/80 z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="fixed left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
            }}
            exit={{ 
              scale: 0, 
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
          >
            <Image
              src={image}
              width={width}
              height={height}
              alt="Modal image"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto"
              priority
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;