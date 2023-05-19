import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

export default defineConfig({
  input: path.resolve(__dirname, 'src/index.ts'),
  // 输出文件
  output: [
    // commonJS
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
    },
  ],
  plugins: [
    // 解析第三方依赖
    resolve(),
    // commonjs一般与@rollup/plugin-node-resolve配合使用
    commonjs(),
    // rollup 编译typescript
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ],
  external: ['postcss'],
});
