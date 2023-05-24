import { Compilation, Compiler, WebpackPluginInstance } from 'webpack';
import { Source } from 'webpack-sources';
import { WechatSelectorTransformer } from './formats/selector';
import { PluginOptions } from './types';

export class UniappTailwindcssWebpackPlugin implements WebpackPluginInstance {
  options = {};
  selectorTransformer;
  constructor(options = {} as PluginOptions) {
    this.options = options;
    this.selectorTransformer = new WechatSelectorTransformer({
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
        this.selectorTransformer.traverse(filename, originalSource as Source, (newSource: string) => {
          const newAssets = new RawSource(newSource);

          compilation.updateAsset(filename, newAssets);
        })
      }
    });
  }
}
