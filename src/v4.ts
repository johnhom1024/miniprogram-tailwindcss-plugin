import { Compilation, Compiler, WebpackPluginInstance } from 'webpack';
import { cssMatcher } from './utils/index';
import { styleHander } from './lib/index'
export class UniappTailwindcssWebpackPlugin implements WebpackPluginInstance {
  options = {};

  constructor(options: any) {
    this.options = options;
  }

  apply(compiler: Compiler) {
    const pluginName = UniappTailwindcssWebpackPlugin.name;
    compiler.hooks.emit.tap(pluginName, (compilation: Compilation) => {
      const entries = Object.entries(compilation.assets);
      for (const [filename, originalSource] of entries) {
        // 如果是main.wxss文件，则获取source
        if (cssMatcher(filename)) {
          const cssSource = originalSource.source().toString();
          styleHander(cssSource);
        }
      }
    })
  }
}
