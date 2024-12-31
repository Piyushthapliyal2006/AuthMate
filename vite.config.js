import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Resolves @ to the 'src' folder
      '@shadcn': path.resolve(__dirname, 'node_modules/shadcn')  // Resolves @shadcn to 'node_modules/shadcn'
    }
  },
})
