import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/assets/style/mian.scss";',
      },
    },
  },
  base: './', // 打包路径
  // 启动服务配置
  server: {
    host: 'localhost',
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    hmr: true,
    https: false,
    proxy: {},
  },
  build: {
    outDir: 'managerportalaccuratemarketing',
    assetsDir: 'static',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // manualChunks(id) { //静态资源分拆打包
        //   if (id.includes('node_modules')) {`````````````````````
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
        //   }
        // }
      },
    },
  },
})
