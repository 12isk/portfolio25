// This worker will handle loading the GLB file
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Initialize the GLTF loader
const loader = new GLTFLoader();

// Optional: Set up Draco compression if your model uses it
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
loader.setDRACOLoader(dracoLoader);

// Listen for messages from the main thread
self.onmessage = async (event) => {
  const { url } = event.data;
  
  try {
    // Load the model
    const gltf = await loader.loadAsync(url);
    
    // Send the loaded data back to the main thread
    self.postMessage({
      type: 'success',
      data: gltf
    });
  } catch (error) {
    // Handle any errors during loading
    self.postMessage({
      type: 'error',
      error: error.message
    });
  }
};