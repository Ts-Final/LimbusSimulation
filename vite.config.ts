import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  if (command == 'serve') {
    return {
      plugins: [vue()],
      base: "/",
    }
  } else {
    return {
      plugins: [vue()],
      base: "https://ts-final.github.io/LimbusSimulation"
    }
  }
})
