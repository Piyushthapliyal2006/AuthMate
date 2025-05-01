import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { conf } from './src/conf/conf.js'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,  // Port for the development server
    open: true,  // Automatically open the browser when the server starts
    proxy: {
      '/api': {
        target: 'https://backend.authmate.xyz',  // Replace with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Remove /api prefix when forwarding to the backend
      },
      '/auth': {
        target: 'https://backend.authmate.xyz',  // Replace with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')  // Remove /auth prefix when forwarding to the backend
      }
    }
    // proxy: {
    //   '/': {
    //     target: "https://backend.authmate.xyz",  // Replace with your backend server URL
    //     changeOrigin: false,
    //     // rewrite: (path) => path.replace(/^\/api/, '')  // Remove /api prefix when forwarding to the backend
    //   },
    //   // '/auth': {
    //   //   target: "https://backend.authmate.xyz",  // Replace with your backend server URL
    //   //   // changeOrigin: true,
    //   //   // rewrite: (path) => path.replace(/^\/kid/, '')  // Remove /kid prefix when forwarding to the backend
    //   // }
    // }
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Resolves @ to the 'src' folder
      '@shadcn': path.resolve(__dirname, 'node_modules/shadcn')  // Resolves @shadcn to 'node_modules/shadcn'
    }
  },
})
