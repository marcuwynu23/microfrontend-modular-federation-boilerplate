import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  
  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: {
          remote1: env.VITE_REMOTE1_URL || (mode === 'production' ? '/remote1/assets/remoteEntry.js' : 'http://localhost:5001/assets/remoteEntry.js'),
          remote2: env.VITE_REMOTE2_URL || (mode === 'production' ? '/remote2/assets/remoteEntry.js' : 'http://localhost:5002/assets/remoteEntry.js'),
        },
        shared: ['react', 'react-dom']
      })
    ],
    server: {
      cors: true
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
  };
});
