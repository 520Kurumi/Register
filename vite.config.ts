import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
 plugins: [vue()],
 resolve: {
  alias: {
   "@": path.resolve(__dirname, 'src')
  }
 },
   //配置代理跨域
   server: {
        proxy: {
        '/api': {
            target: 'http://syt.atguigu.cn',
            changeOrigin: true,
            //以下新增
            ws: true, // 是否代理websockets
            rewrite: (path) => path,
        },
        }
    },
    build: {
    outDir: 'docs',
    // //@ts-ignore
    // index: path.resolve(__dirname, '../docs/index.html'),
    // // Paths
    // assetsRoot: path.resolve(__dirname, '../docs'),
    // assetsSubDirectory: 'static',
    // assetsPublicPath: './',
  },
  base:'./'

})
