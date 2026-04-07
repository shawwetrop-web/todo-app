// 全局配置文件，整个项目只改这里！
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: true
  },
  // 👇 加上这个，彻底解决频繁打开白屏
  cacheDir: false
})
export const config = {
  // 后端接口地址（只改这一行！）
  baseURL: 'https://todo-backend-production-e0b1.up.railway.app'
}