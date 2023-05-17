import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'rollup'
import path from 'path';

import pkg from './package.json';

export default defineConfig({
  input: path.resolve(__dirname, 'src/index.ts'),
  // 输出文件
  output: [
    // commonJS
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    // 解析第三方依赖
    resolve(),
    // rollup 编译typescript
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    })
  ],
  external: [
    /node_modules/
  ]
})