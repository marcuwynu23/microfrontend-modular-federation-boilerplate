import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          remote1: isProd 
            ? '/remote1/assets/remoteEntry.js'
            : 'http://localhost:5001/assets/remoteEntry.js',
          remote2: isProd
            ? '/remote2/assets/remoteEntry.js'
            : 'http://localhost:5002/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom']
      })
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
  };
});
