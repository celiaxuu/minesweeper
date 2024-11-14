import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', 
    assetsDir: 'assets', 
    emptyOutDir: true, 
  },
  base: './' // 设置基础公共路径
})