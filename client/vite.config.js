// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8700,  // Set port to 8700
    host: '0.0.0.0',  // Set host to 0.0.0.0 to allow access from the network
  },
});
