import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

import pkg from './package.json';

export default defineConfig({
  input: path.resolve(__dirname, 'src/index.ts'),
  // 输出文件
  output: [
    // commonJS
    {
      file: 'dist/index.js',
      format: 'cjs',
      // interop设置为compat将会对引入的external包进行处理，自动识别并调整引入的方式
      interop: 'compat',
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      interop: 'compat',
    },
  ],
  plugins: [
    // 解析第三方依赖
    nodeResolve(),
    // commonjs一般与@rollup/plugin-node-resolve配合使用
    commonjs(),
    // rollup 编译typescript
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  external: [...(pkg.dependencies ? Object.keys(pkg.dependencies) : [])],
});
