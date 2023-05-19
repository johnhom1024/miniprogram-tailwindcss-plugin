import { Compilation, Compiler, WebpackPluginInstance } from 'webpack';
import { cssMatcher } from './utils/index';
import { StyleSelectorTransformer } from './formats/selector';
import { PluginOptions } from './types';

export class UniappTailwindcssWebpackPlugin implements WebpackPluginInstance {
  options = {};
  styleSelectorTransformer: StyleSelectorTransformer;
  constructor(options = {} as PluginOptions) {
    this.options = options;
    this.styleSelectorTransformer = new StyleSelectorTransformer({
      customMappingChars2String: options.customMappingChars2String
    });
  }

  apply(compiler: Compiler) {
    const { webpack } = compiler;

    const { RawSource } = webpack.sources;
    const pluginName = UniappTailwindcssWebpackPlugin.name;
    compiler.hooks.emit.tap(pluginName, (compilation: Compilation) => {
      const entries = Object.entries(compilation.assets);
      for (const [filename, originalSource] of entries) {
        // 如果是main.wxss文件，则获取source
        if (cssMatcher(filename)) {
          const cssSource = originalSource.source().toString();
          const newRawSource = this.styleSelectorTransformer.styleHandler(cssSource);

          const updateAsset = new RawSource(newRawSource)

          compilation.updateAsset(filename, updateAsset);
        }
      }
    });
  }
}
